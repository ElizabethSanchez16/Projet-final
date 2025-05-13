export default async function StripePage({ searchParams }) {
    const { canceled } = await searchParams
  
    if (canceled) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
    return (
        <p>Stripe</p>,
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
      </form>
    )
  }