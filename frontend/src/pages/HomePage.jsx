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
                  href="auto"
                  className="uppercase py-2 px-4 rounded-lg bg-orange-500 border-2 border-transparent text-white text-md mr-4 hover:bg-orange-400"
                >
                  Noleggia ora
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
              Ci distinguiamo per il nostro servizio clienti eccezionale.
              Sappiamo che viaggiare può comportare domande e imprevisti, quindi
              il nostro team è qui per assisterti in ogni fase del tuo viaggio.
              Siamo pronti a rispondere alle tue domande, fornirti assistenza e
              risolvere eventuali problemi. Con il nostro servizio clienti
              premiato, puoi viaggiare serenamente sapendo che siamo sempre
              disponibili per te. Contattaci oggi e scopri la differenza che un
              servizio clienti di alta qualità può fare per il tuo prossimo
              viaggio!
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
              Comprendiamo l'importanza di ottenere il massimo valore per il tuo
              denaro quando prenoti un'auto a noleggio. Per questo offriamo
              tariffe competitive e trasparenti, senza sorprese. Le nostre
              tariffe includono tutto, dalla tassa di noleggio
              all'assicurazione. Offriamo anche promozioni speciali per aiutarti
              a risparmiare. Con noi, puoi prenotare con fiducia e concentrarti
              sul goderti il viaggio.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-20">
              Ampio garage veicoli
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ogni viaggio è unico, e le esigenze di mobilità variano da persona
              a persona. Offriamo una vasta gamma di veicoli per soddisfare ogni
              necessità, dalle auto compatte per la città, alle berline spaziose
              per viaggi di lavoro o piacere, fino ai SUV robusti per avventure
              fuori porta. La nostra flotta è composta da modelli di alta
              qualità, sempre mantenuti in perfette condizioni. Scegli tra le
              nostre opzioni di noleggio flessibili e convenienti e prenota oggi
              stesso per iniziare il tuo viaggio con il piede giusto!
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
    </div>
  );
};

export default HomePage;
