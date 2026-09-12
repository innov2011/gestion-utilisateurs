import { Link, useParams } from "react-router-dom";
import { DONNEES } from "../data/utilisateurs";

function DetailsUtilisateur() {
  const { id } = useParams();
  const user = DONNEES.find((utilisateur) => utilisateur.index === id);
  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

  if (!user) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-5 py-16">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Profil indisponible</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Utilisateur introuvable</h1>
          <p className="mt-3 leading-relaxed text-slate-500">Ce profil n’existe pas. Retrouvez les autres utilisateurs dans la liste.</p>
          <Link to="/me/users" className={`${focus} mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700`}>
            Retour aux utilisateurs
          </Link>
        </div>
      </section>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const gender = user.gender === "male" ? "Homme" : user.gender === "female" ? "Femme" : user.gender;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/me/users" className={`${focus} inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-blue-600`}>
          <span aria-hidden="true">←</span> Tous les utilisateurs
        </Link>
        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div aria-hidden="true" className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 sm:h-48">
            <div className="absolute -right-12 -top-28 h-80 w-80 rounded-full border-[40px] border-white/10" />
            <div className="absolute bottom-0 right-48 h-40 w-40 translate-y-1/2 rounded-full bg-white/10" />
          </div>
          <div className="px-6 pb-8 sm:px-10 sm:pb-10">
            <div className="relative -mt-20 flex flex-col items-start gap-5 sm:-mt-24 sm:flex-row sm:items-end sm:justify-between">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border-4 border-white bg-blue-100 shadow-md sm:h-48 sm:w-48">
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-700">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
                <img key={user.picture} src={user.picture} alt={fullName} className="relative h-full w-full object-cover"
                  onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
              </div>
              <a href={`mailto:${user.email}`} className={`${focus} inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700`}>
                Envoyer un email <span aria-hidden="true" className="ml-3">↗</span>
              </a>
            </div>
            <header className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Profil utilisateur</p>
              <h1 className="mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl">{fullName}</h1>
              <p className="mt-2 text-slate-500">{user.address}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{user.age} ans</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{gender}</span>
              </div>
            </header>
            <div className="mt-8 grid gap-8 border-t border-slate-100 pt-8 md:grid-cols-2 md:gap-12">
              <section aria-labelledby="contact-title">
                <h2 id="contact-title" className="text-lg font-semibold">Coordonnées</h2>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-sm text-slate-500">Adresse email</dt>
                    <dd className="mt-1 break-words font-medium"><a className={`${focus} text-blue-700 hover:underline`} href={`mailto:${user.email}`}>{user.email}</a></dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500">Téléphone</dt>
                    <dd className="mt-1 font-medium"><a className={`${focus} hover:text-blue-700 hover:underline`} href={`tel:${user.phone.replace(/\s/g, "")}`}>{user.phone}</a></dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500">Adresse</dt>
                    <dd className="mt-1 font-medium">{user.address}</dd>
                  </div>
                </dl>
              </section>
              <section aria-labelledby="about-title" className="rounded-2xl bg-slate-50 p-6">
                <h2 id="about-title" className="text-lg font-semibold">À propos</h2>
                <p className="mt-4 break-words leading-7 text-slate-600">{user.about || "Cet utilisateur n’a pas encore ajouté de présentation."}</p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DetailsUtilisateur;
