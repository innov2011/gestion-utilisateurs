import { Link } from "react-router-dom";

type Params = {
  index?: string;
  picture?: string;
  age?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
};

function Messsage(params: Params) {
  const fullName =
    [params.firstName, params.lastName].filter(Boolean).join(" ") ||
    "Utilisateur";
  const gender =
    params.gender === "male"
      ? "Homme"
      : params.gender === "female"
        ? "Femme"
        : params.gender;

  return (
    <Link
      to={`/me/users/${params.index}`}
      className="group flex h-full min-h-48 overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-100 to-rose-200 shadow-sm transition duration-200 hover:border-rose-400 hover:shadow-lg hover:shadow-rose-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      <div className="relative w-[45%] shrink-0 overflow-hidden bg-rose-200">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-rose-800"
        >
          {params.firstName?.charAt(0)}
          {params.lastName?.charAt(0)}
        </span>
        {params.picture && (
          <img
            key={params.picture}
            src={params.picture}
            alt=""
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-top"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
            onLoad={(event) => {
              event.currentTarget.style.visibility = "visible";
            }}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="break-words text-lg font-bold leading-tight tracking-tight transition group-hover:text-blue-700">
          {fullName}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-medium">
          {params.age != null && (
            <span className="rounded-full bg-white/60 px-2 py-1 text-blue-800">
              {params.age} ans
            </span>
          )}
          {gender && (
            <span className="rounded-full bg-white/60 px-2 py-1 text-slate-700">
              {gender}
            </span>
          )}
        </div>
        <p className="my-3 line-clamp-2 break-words text-xs leading-relaxed text-slate-600">
          {params.address || "Adresse non renseignée"}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-rose-300/60 pt-3 text-xs font-semibold text-blue-800">
          <span>
            Voir le profil<span className="sr-only"> de {fullName}</span>
          </span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </Link>
  );
}

export default Messsage;
