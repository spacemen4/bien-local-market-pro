import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { priceId, organisationId } = await req.json()

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Récupérer les informations utilisateur
    const { data: utilisateur } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!utilisateur) {
      return new Response('User not found', { status: 404 })
    }

    // Vérifier ou créer le client Stripe
    let stripeCustomerId: string
    const { data: existingCustomer } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('utilisateur_id', user.id)
      .single()

    if (existingCustomer) {
      stripeCustomerId = existingCustomer.stripe_customer_id
    } else {
      // Créer un nouveau client Stripe
      const customer = await stripe.customers.create({
        email: utilisateur.email,
        name: `${utilisateur.prenom} ${utilisateur.nom}`,
        metadata: {
          utilisateur_id: user.id,
          organisation_id: organisationId || ''
        }
      })

      stripeCustomerId = customer.id

      // Enregistrer le client dans la base
      await supabase
        .from('stripe_customers')
        .insert({
          utilisateur_id: user.id,
          stripe_customer_id: customer.id,
          email: utilisateur.email
        })
    }

    // Récupérer les informations du plan
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('stripe_price_id', priceId)
      .single()

    if (!plan) {
      return new Response('Plan not found', { status: 404 })
    }

    // Créer la session de checkout ou l'abonnement directement
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/subscription/cancel`,
      metadata: {
        utilisateur_id: user.id,
        organisation_id: organisationId || '',
        plan_id: plan.id
      },
      subscription_data: {
        metadata: {
          utilisateur_id: user.id,
          organisation_id: organisationId || '',
          plan_id: plan.id
        },
        trial_period_days: 14 // Période d'essai de 14 jours
      }
    })

    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error creating subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

// Fonction helper pour créer un abonnement directement (sans checkout)
async function createDirectSubscription(
  stripe: Stripe,
  supabase: any,
  customerId: string,
  priceId: string,
  userId: string,
  organisationId: string,
  planId: string
) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        utilisateur_id: userId,
        organisation_id: organisationId,
        plan_id: planId
      },
      trial_period_days: 14
    })

    // Enregistrer l'abonnement dans la base
    await supabase
      .from('subscriptions')
      .insert({
        utilisateur_id: userId,
        organisation_id: organisationId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customerId,
        plan_id: planId,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
      })

    return subscription
  } catch (error) {
    console.error('Error creating direct subscription:', error)
    throw error
  }
}
