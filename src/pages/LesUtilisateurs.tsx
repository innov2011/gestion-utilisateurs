import { Link } from "react-router-dom";
// Ancien : import { useState } from "react";
// useEffect lance le chargement ; useState conserve son résultat.
import { useEffect, useState } from "react";
import Messsage from "../composants/Message";
// Ancien : import { DONNEES } from "../data/utilisateurs";
// utilisateurs.tsx fournit la fonction de chargement et le type des données.
import { getUsers } from "../data/utilisateurs";
import type { utilisateurAPI } from "../data/utilisateurs";

const normaliser = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function Donnees() {
  // getUsers (utilisateurs.tsx) remplit users ; les deux autres états suivent la requête.
  const [users, setUsers] = useState<utilisateurAPI[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // Au montage, récupère la liste depuis utilisateurs.tsx et actualise l'affichage.
  useEffect(() => {
    // Ignore la réponse si la page a été quittée pendant la requête.
    let actif = true;

    getUsers()
      .then((resultat) => {
        if (actif) setUsers(resultat);
      })
      .catch(() => {
        if (actif) setErreur("Impossible de charger les utilisateurs.");
      })
      .finally(() => {
        if (actif) setChargement(false);
      });

    // React appelle ce nettoyage lorsque cet effet est terminé.
    return () => {
      actif = false;
    };
  }, []);

  const [recherche, setRecherche] = useState("");
  // Le type API ne fournit pas de genre : cet état n'est plus utilisé.
  // const [genre, setGenre] = useState("");
  const [tri, setTri] = useState("nom-asc");
  const mots = normaliser(recherche).trim().split(/\s+/).filter(Boolean);
  /* Ancien filtrage et tri sur DONNEES :
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
  */
  // Filtre users reçu de getUsers : name est le nom complet, address est un objet.
  const utilisateurs = users
    .filter((user) => {
      const texte = normaliser(
        `${user.name} ${user.email} ${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`,
      );
      return mots.every((mot) => texte.includes(mot));
    })
    .sort((a, b) => {
      // Le tri utilise le nom complet ; l'âge n'est pas fourni par le type API.
      const parNom = a.name.localeCompare(b.name, "fr", {
        sensitivity: "base",
      });
      return tri === "nom-desc" ? -parNom : parNom;
    });
  const reinitialiser = () => {
    setRecherche("");
    // Le filtre Genre est désactivé, donc sa réinitialisation aussi.
    // setGenre("");
    setTri("nom-asc");
  };
  const champ =
    "mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
  // Attend la réponse avant d'afficher la liste ou le message « Aucun utilisateur ».
  if (chargement)
    return (
      <p role="status" className="p-6">
        Chargement des utilisateurs…
      </p>
    );
  if (erreur)
    return (
      <p role="alert" className="p-6">
        {erreur}
      </p>
    );
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10"
          />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
              Les nouvelles vies
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Les utilisateurs
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-blue-100">
              Retrouvez tous les membres et découvrez leur profil en un clic.
            </p>
            <span className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              {/* Ancien : {DONNEES.length} utilisateurs à découvrir */}
              {/* Le compteur utilise la liste reçue de getUsers. */}
              {users.length} utilisateurs à découvrir
            </span>
          </div>
        </header>

        <section
          aria-label="Recherche et filtres"
          className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5"
        >
          {/* Ancien : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]"> */}
          {/* Deux colonnes suffisent pour la recherche et le tri restants. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2 lg:col-span-1">
              Rechercher un utilisateur
              <input
                type="search"
                value={recherche}
                onChange={(event) => setRecherche(event.target.value)}
                placeholder="Nom, prénom, email ou adresse…"
                className={champ}
              />
            </label>
            {/* Le genre n'est pas fourni : ancien filtre conservé en commentaire.
            <label className="text-sm font-semibold text-slate-700">
              Genre
              <select value={genre} onChange={(event) => setGenre(event.target.value)} className={champ}>
                <option value="">Tous les genres</option>
                <option value="male">Hommes</option>
                <option value="female">Femmes</option>
              </select>
            </label>
            */}
            <label className="text-sm font-semibold text-slate-700">
              Trier par
              <select
                value={tri}
                onChange={(event) => setTri(event.target.value)}
                className={champ}
              >
                <option value="nom-asc">Nom : A → Z</option>
                <option value="nom-desc">Nom : Z → A</option>
                {/* L'âge n'est pas fourni : anciennes options désactivées.
                <option value="age-asc">Âge : croissant</option>
                <option value="age-desc">Âge : décroissant</option>
                */}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-sm text-slate-600">
              {/* Ancien : {utilisateurs.length} résultat{utilisateurs.length > 1 ? "s" : ""} sur {DONNEES.length} utilisateurs */}
              {/* Compare le nombre filtré au total reçu de l'API. */}
              {utilisateurs.length} résultat{utilisateurs.length > 1 ? "s" : ""}{" "}
              sur {users.length} utilisateurs
            </p>
            {/* Ancien : <button type="button" onClick={reinitialiser} disabled={!recherche && !genre && tri === "nom-asc"} */}
            {/* Le bouton dépend uniquement de la recherche et du tri restants. */}
            <button
              type="button"
              onClick={reinitialiser}
              disabled={!recherche && tri === "nom-asc"}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Réinitialiser
            </button>
          </div>
        </section>

        <div className="mb-5 mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight">Tous les profils</h2>
          <p className="text-sm text-slate-500">
            Cliquez sur une carte pour voir les détails
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {/* Ancienne transmission directe des champs de DONNEES :
          {utilisateurs.map((utilisateur) => (
            <li key={utilisateur.index} className="min-w-0">
              <Messsage {...utilisateur} />
            </li>
          ))}
          */}
          {/* LesUtilisateurs.tsx → Message.tsx : adapte les champs API aux propriétés de la carte.
              id devient index (texte), name devient firstName (nom complet), address devient du texte.
              Message.tsx utilise index dans le lien /me/users/:id vers DetailsUtilisateur.tsx. */}
          {utilisateurs.map((utilisateur) => (
            <li key={utilisateur.id} className="min-w-0">
              <Messsage
                index={String(utilisateur.id)}
                firstName={utilisateur.name}
                email={utilisateur.email}
                phone={utilisateur.phone}
                address={`${utilisateur.address.street}, ${utilisateur.address.suite}, ${utilisateur.address.zipcode} ${utilisateur.address.city}`}
              />
            </li>
          ))}
        </ul>
        {utilisateurs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold">Aucun utilisateur trouvé</h3>
            <p className="mt-2 text-sm text-slate-600">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Donnees;
