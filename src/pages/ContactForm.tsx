function ContactForm () {
  return (
    <main className="flex flex-col items-center justify-center max-w-md p-8">
    <section className="flex flex-col max-w-md">
      <h1 className="text-h1 font-bold text-black">Formulaire de contact</h1>
      <form id="contact-form" className="mt-10">
        <label htmlFor="user_name">Nom</label>
        <input type="text" name="user_name" id="user_name" className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"/>
        <label htmlFor="user_firstname">Prénom</label>
        <input type="text" name="user_firstname" id="user_firstname" className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"/>
        <label htmlFor="user_email">Adresse email</label>
        <input type="email" name="user_email" id="user_email" className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"/>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" className="mt-1 mb-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"/>
        <input type="submit" value="Send" className="mt-5 w-full py-2 px-4 bg-greenroots_green text-greenroots_white text-xs rounded-full"/>
      </form>
    </section>
    </main>
  );
}

export default ContactForm;