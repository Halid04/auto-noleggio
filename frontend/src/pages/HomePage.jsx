import React from "react";

const HomePage = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="HomePage h-full w-full overflow-y-auto overflow-x-hidden">
      <main className="dark:bg-gray-800 bg-white">
        <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center">
          <div className="container  px-6 flex relative py-16  ">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 ">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
              <h1 className="font-bebas-neue uppercase text-5xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                AUTONOLEGGIO
                <span className="text-5xl sm:text-7xl">ITIS</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-10">
                Esplora nuovi orizzonti con il nostro servizio di autonoleggio.
                Sia che tu stia viaggiando per lavoro o per piacere, siamo qui
                per rendere il tuo viaggio senza stress. Con una vasta selezione
                di veicoli di qualità e un servizio clienti eccezionale, puoi
                contare su di noi per un'esperienza di noleggio indimenticabile.
                Scegli la libertà. Scegli Autonoleggio ITIS.
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-orange-500 border-2 border-transparent text-white text-md mr-4 hover:bg-orange-400"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-orange-500 dark:text-white hover:bg-orange-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative h-auto">
              <img src="src/assets/AudiQ31.jpg" className="mt-20" />
            </div>
          </div>
        </div>
      </main>

      <div className="flex mt-20 mb-20">
        <div className="ml-10 mr-10">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ampio Garage Veicoli
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Esplora la nostra vasta gamma di veicoli per trovare quello
              perfetto per le tue esigenze di viaggio..
            </p>
          </a>
        </div>

        <div className="ml-10 mr-10">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tariffe Competitive
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Offriamo tariffe competitive e trasparenti per garantirti il
              miglior valore per il tuo noleggio auto.
            </p>
          </a>
        </div>

        <div className="ml-10 mr-10">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Servizio Di Qualità
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Servizio clienti reattivo e disponibile, sia attraverso chat
              online, telefono o email, molto efficiente.
            </p>
          </a>
        </div>
      </div>

      <section id="services">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-20">
              Servizio Clienti Eccezionale
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Il nostro impegno per offrire un servizio clienti eccezionale è
              ciò che ci distingue dalla concorrenza. Sappiamo che affrontare un
              viaggio può comportare domande, preoccupazioni e imprevisti, ed è
              per questo che il nostro team dedicato è qui per assisterti in
              ogni fase del tuo viaggio. Siamo disponibili per rispondere alle
              tue domande, fornirti assistenza e risolvere qualsiasi problema tu
              possa incontrare durante il tuo noleggio auto. Con il nostro
              servizio clienti premiato, puoi avere la tranquillità che saremo
              sempre qui per te, pronti ad aiutarti a rendere il tuo viaggio il
              più piacevole e senza problemi possibile. Contattaci oggi stesso e
              scopri la differenza che un servizio clienti di alta qualità può
              fare per il tuo prossimo viaggio!
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="https://plus.unsplash.com/premium_vector-1682310922955-ea5e6f791471?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWxsdXN0cmF0aW9uJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Servizio Clienti Eccezionale"
              className="mx-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <img
              src="https://plus.unsplash.com/premium_vector-1682301054119-d9cc99c44cb2?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlsbHVzdHJhdGlvbiUyMG1vbmV5fGVufDB8fDB8fHww"
              alt="Tariffe Competitive"
              className="mx-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="w-1/2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-20">
              Tariffe Competitive
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Sappiamo quanto sia importante per te ottenere il massimo valore
              per il tuo denaro quando prenoti un veicolo a noleggio. È per
              questo che ci impegniamo a offrire tariffe competitive e
              trasparenti che ti permettano di pianificare il tuo viaggio con
              fiducia, senza sorprese nascoste lungo il percorso. Le nostre
              tariffe sono chiaramente indicate e comprendono tutto ciò di cui
              hai bisogno per il tuo viaggio, dalla tassa di noleggio
              all'assicurazione e ai costi aggiuntivi. Inoltre, offriamo
              regolarmente offerte speciali e promozioni per aiutarti a
              risparmiare ancora di più sul tuo noleggio auto. Con noi, puoi
              prenotare con la sicurezza di ottenere il massimo valore per il
              tuo denaro e concentrarti sul goderti il tuo viaggio al massimo.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-20">
              Ampio garage veicoli
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Il viaggio è un'esperienza unica per ognuno di noi e sappiamo che
              le esigenze di mobilità possono variare notevolmente da persona a
              persona. È per questo che ci impegniamo a offrire una vasta gamma
              di veicoli tra cui scegliere, in modo che tu possa trovare
              esattamente ciò di cui hai bisogno per rendere il tuo viaggio
              indimenticabile. Dalle auto compatte perfette per esplorare le
              strade cittadine, alle spaziose berline adatte per viaggi di
              lavoro o di piacere, fino ai robusti SUV ideali per avventure
              fuori porta con la famiglia, la nostra flotta è progettata per
              soddisfare ogni tua esigenza. Con modelli di auto di alta qualità
              e sempre mantenuti al massimo delle prestazioni, puoi affrontare
              il tuo viaggio con fiducia, sapendo di avere un compagno
              affidabile dalla tua parte. Scegli tra le nostre opzioni di
              noleggio flessibili e convenienti e prenota il tuo veicolo oggi
              stesso per iniziare il tuo prossimo viaggio con il piede giusto!
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="https://plus.unsplash.com/premium_vector-1682300537473-54f41f5a3bf6?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aWxsdXN0cmF0aW9uJTIwZ2FyYWdlfGVufDB8fDB8fHww"
              alt="Servizio Clienti Eccezionale"
              className="mx-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
        <div class="grid gap-4">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1542838106-38bae66f985f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwb3J0cyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1625755413847-5e2704befe69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img class="h-auto max-w-full rounded-lg" src="" alt="" />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1579508542697-bb18e7d9aeaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BvcnRzJTIwY2FyfGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1628519592419-bf288f08cef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0cyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1584978881961-27af5fb6d7ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1563339018-51d1ef22f402?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1578656415093-e7e19e5e132b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0cyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1535448580089-c7f9490c78b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwb3J0cyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1625958085917-38d3c6ba960d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1626847037657-fd3622613ce3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHNwb3J0cyUyMGNhciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>

      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="https://flowbite.com/" class="hover:underline">
                      Flowbite
                    </a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" class="hover:underline">
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      class="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      class="hover:underline"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" class="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span class="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
