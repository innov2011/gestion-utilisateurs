import { Link } from "react-router-dom";
import { useState } from "react";
import Messsage from "../composants/Message";
import { DONNEES } from "../data/utilisateurs";

const normaliser = (texte: string) => texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Donnees() {
  const [recherche, setRecherche] = useState("");
  const [genre, setGenre] = useState("");
  const [tri, setTri] = useState("nom-asc");
  const mots = normaliser(recherche).trim().split(/\s+/).filter(Boolean);
  const utilisateurs = DONNEES.filter((user) => {
    const texte = normaliser(`${user.firstName} ${user.lastName} ${user.email} ${user.address}`);
    return (!genre || user.gender === genre) && mots.every((mot) => texte.includes(mot));
  }).sort((a, b) => {
    const parNom = a.lastName.localeCompare(b.lastName, "fr", { sensitivity: "base" })
      || a.firstName.localeCompare(b.firstName, "fr", { sensitivity: "base" });
    if (tri === "nom-desc") return -parNom;
    if (tri === "age-asc") return a.age - b.age || parNom;
    if (tri === "age-desc") return b.age - a.age || parNom;
    return parNom;
  });
  const reinitialiser = () => {
    setRecherche("");
    setGenre("");
    setTri("nom-asc");
  };
  const champ = "mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <span aria-hidden="true">←</span> Retour à l’accueil
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 px-6 py-10 text-white sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Les nouvelles vies</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Les utilisateurs</h1>
            <p className="mt-4 max-w-lg leading-relaxed text-blue-100">
              Retrouvez tous les membres et découvrez leur profil en un clic.
            </p>
            <span className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              {DONNEES.length} utilisateurs à découvrir
            </span>
          </div>
        </header>

        <section aria-label="Recherche et filtres" className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2 lg:col-span-1">
              Rechercher un utilisateur
              <input type="search" value={recherche} onChange={(event) => setRecherche(event.target.value)}
                placeholder="Nom, prénom, email ou adresse…" className={champ} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Genre
              <select value={genre} onChange={(event) => setGenre(event.target.value)} className={champ}>
                <option value="">Tous les genres</option>
                <option value="male">Hommes</option>
                <option value="female">Femmes</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Trier par
              <select value={tri} onChange={(event) => setTri(event.target.value)} className={champ}>
                <option value="nom-asc">Nom : A → Z</option>
                <option value="nom-desc">Nom : Z → A</option>
                <option value="age-asc">Âge : croissant</option>
                <option value="age-desc">Âge : décroissant</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-sm text-slate-600">
              {utilisateurs.length} résultat{utilisateurs.length > 1 ? "s" : ""} sur {DONNEES.length} utilisateurs
            </p>
            <button type="button" onClick={reinitialiser} disabled={!recherche && !genre && tri === "nom-asc"}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent">
              Réinitialiser
            </button>
          </div>
        </section>

        <div className="mb-5 mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight">Tous les profils</h2>
          <p className="text-sm text-slate-500">Cliquez sur une carte pour voir les détails</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {utilisateurs.map((utilisateur) => (
            <li key={utilisateur.index} className="min-w-0">
              <Messsage {...utilisateur} />
            </li>
          ))}
        </ul>
        {utilisateurs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold">Aucun utilisateur trouvé</h3>
            <p className="mt-2 text-sm text-slate-600">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Donnees;

