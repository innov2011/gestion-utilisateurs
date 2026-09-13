import { useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { Link } from "react-router-dom";

const champ = "mt-2 w-full rounded-xl border border-blue-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";
const panneau = "scroll-mt-6 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100/70 p-6 shadow-sm sm:p-8";

function Champ({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="block text-sm font-medium text-slate-700">{label}{props.required && <span className="text-blue-600"> *</span>}<input {...props} className={champ} /></label>;
}

function LesDemandes() {
  const [recap, setRecap] = useState<Record<string, string> | null>(null);
  const recapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const date = new Date();
  const aujourdHui = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  function preparer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const donnees = new FormData(event.currentTarget);
    setRecap(Object.fromEntries(Array.from(donnees.entries(), ([key, value]) => [key, String(value).trim()])));
    requestAnimationFrame(() => recapRef.current?.focus());
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">← Retour à l’accueil</Link>
        <header className="relative mb-8 mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 px-6 py-10 text-white sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-40 h-40 w-40 translate-y-1/2 rounded-full bg-white/10" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Les nouvelles vies</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Les demandes</h1>
            <p className="mt-4 max-w-xl leading-relaxed text-blue-100">Une nouvelle vie, une première démarche. Préparez la déclaration de naissance de votre enfant auprès de la mairie.</p>
            <span className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">Service de l’état civil · Déclaration de naissance</span>
          </div>
        </header>
        <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-6">
            <nav aria-label="Sections du formulaire" className="rounded-2xl border border-blue-200 bg-blue-100/70 p-5 shadow-sm"><p className="mb-5 text-xs font-bold uppercase tracking-widest text-blue-700">Votre déclaration</p><ol className="space-y-3">{["Le nouveau-né", "Les parents", "Le déclarant"].map((titre, index) => <li key={titre}><a href={`#section-${index}`} className="flex items-center gap-3 rounded-xl p-2 text-sm font-semibold transition hover:bg-white/60 hover:text-blue-700 focus-visible:outline-blue-600"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm">0{index + 1}</span>{titre}</a></li>)}</ol></nav>
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-100 to-rose-200 p-5 text-sm leading-6 text-slate-700 shadow-sm"><p className="font-bold text-blue-900">Avant de commencer</p><p className="mt-2">Gardez à portée de main les informations du certificat de naissance délivré par l’hôpital et celles des parents.</p><p className="mt-4 border-t border-rose-300/60 pt-4">Les champs marqués d’un * sont obligatoires dans ce formulaire.</p></div>
            <p className="px-1 text-xs leading-5 text-slate-500">Version de démonstration : aucune information n’est envoyée à la mairie ni conservée après le rechargement de la page.</p>
          </aside>
          <form ref={formRef} onSubmit={preparer} onChange={() => setRecap(null)} className="space-y-6">
            <fieldset id="section-0" className={panneau}>
              <legend className="sr-only">Le nouveau-né</legend><p className="text-xs font-bold uppercase tracking-widest text-blue-600">01 · Naissance</p><h2 className="mt-2 text-xl font-bold">Bienvenue au nouveau-né</h2><p className="mt-1 text-sm text-slate-500">Reprenez les informations figurant sur le certificat de l’hôpital.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Champ label="Prénom(s) de l’enfant" name="Prénom(s) de l’enfant" required pattern=".*\S.*" maxLength={100} placeholder="Ex. : Marie Louise" />
                <Champ label="Nom de famille de l’enfant" name="Nom de famille de l’enfant" required pattern=".*\S.*" maxLength={100} />
                <Champ label="Date de naissance" name="Date de naissance" type="date" required max={aujourdHui} />
                <Champ label="Heure de naissance" name="Heure de naissance" type="time" required />
                <label className="text-sm font-medium text-slate-700">Sexe de l’enfant *<select name="Sexe de l’enfant" required defaultValue="" className={champ}><option value="" disabled>Sélectionner</option><option>Féminin</option><option>Masculin</option><option>Non précisé sur le certificat</option></select></label>
                <Champ label="Hôpital ou maternité" name="Hôpital ou maternité" required pattern=".*\S.*" maxLength={150} placeholder="Nom de l’établissement" />
                <Champ label="Commune de naissance" name="Commune de naissance" required pattern=".*\S.*" maxLength={100} />
                <Champ label="Référence du certificat (facultatif)" name="Référence du certificat" maxLength={100} />
              </div>
              <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />Je confirme que l’établissement de naissance se situe dans la commune de cette mairie. *</label>
            </fieldset>
            <fieldset id="section-1" className="scroll-mt-6 rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-100 to-rose-200/70 p-6 shadow-sm sm:p-8">
              <legend className="sr-only">Les parents</legend><p className="text-xs font-bold uppercase tracking-widest text-blue-600">02 · Filiation</p><h2 className="mt-2 text-xl font-bold">Les informations des parents</h2><p className="mt-1 text-sm text-slate-500">Complétez les informations connues, telles qu’elles figurent sur leurs documents.</p>
              {["Mère", "Père"].map((parent) => <div key={parent} className="mt-6 border-t border-slate-100 pt-5"><h3 className="mb-4 font-semibold">{parent} <span className="text-xs font-normal text-slate-400">· Informations facultatives</span></h3><div className="grid gap-5 sm:grid-cols-2"><Champ label="Prénom(s)" name={`${parent} — Prénom(s)`} maxLength={100} /><Champ label="Nom de famille" name={`${parent} — Nom`} maxLength={100} /><Champ label="Date de naissance" name={`${parent} — Date de naissance`} type="date" max={aujourdHui} /><Champ label="Lieu de naissance" name={`${parent} — Lieu de naissance`} maxLength={150} /></div></div>)}
            </fieldset>
            <fieldset id="section-2" className={panneau}>
              <legend className="sr-only">Le déclarant</legend><p className="text-xs font-bold uppercase tracking-widest text-blue-600">03 · Contact</p><h2 className="mt-2 text-xl font-bold">Qui effectue la déclaration ?</h2><p className="mt-1 text-sm text-slate-500">Indiquez les coordonnées de la personne à contacter pour cette démarche.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Champ label="Nom et prénom(s)" name="Déclarant" required pattern=".*\S.*" autoComplete="name" maxLength={150} />
                <label className="text-sm font-medium text-slate-700">Lien avec l’enfant *<select name="Lien avec l’enfant" required defaultValue="" className={champ}><option value="" disabled>Sélectionner</option><option>Mère</option><option>Père</option><option>Représentant de l’hôpital</option><option>Autre</option></select></label>
                <Champ label="Téléphone" name="Téléphone" type="tel" required pattern=".*[0-9].*" autoComplete="tel" maxLength={30} />
                <Champ label="Adresse email (facultatif)" name="Email" type="email" autoComplete="email" maxLength={150} placeholder="vous@exemple.com" />
                <div className="sm:col-span-2"><Champ label="Adresse de résidence" name="Adresse de résidence" required pattern=".*\S.*" autoComplete="street-address" maxLength={250} placeholder="Quartier, rue, numéro et commune" /></div>
              </div>
            </fieldset>
            <div className={panneau}>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />Je confirme avoir vérifié les informations renseignées avant de préparer le récapitulatif. *</label>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="max-w-xs text-xs leading-5 text-slate-500">Vous pourrez relire et corriger vos informations à l’étape suivante.</p><button type="submit" className="rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Vérifier ma déclaration →</button></div>
            </div>
            {recap && <div ref={recapRef} tabIndex={-1} className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-blue-950">Récapitulatif de votre déclaration</h2><p role="status" className="mt-2 text-sm leading-6 text-blue-900">Votre récapitulatif est prêt. Aucune déclaration n’a été transmise : le service d’envoi à la mairie n’est pas encore connecté.</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(recap).filter(([, valeur]) => valeur).map(([label, valeur]) => <div key={label} className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium">{valeur}</dd></div>)}</dl>
              <button type="button" onClick={() => { setRecap(null); formRef.current?.querySelector("input")?.focus(); }} className="mt-6 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100">Modifier les informations</button>
            </div>}
          </form>
        </div>
        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">Les nouvelles vies · Service municipal de l’état civil</footer>
      </div>
    </main>
  );
}

export default LesDemandes;
