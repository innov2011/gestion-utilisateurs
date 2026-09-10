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
  return (
    <article className="flex flex-nowrap gap-5 bg-red-300 rounded-3xl">
      <div>
        <img src={params?.picture ? params.picture : ""} alt="" className="rounded-l-3xl h-full" />
      </div>
      <div className="">
        <p className="font-semibold text-xl md:font-bold md:text-5xl py-2">
          {params?.firstName ? <span>{params.firstName} </span> : "----"}{" "}
          {params?.lastName ? (
            <span>{params.lastName.toUpperCase()} </span>
          ) : (
            "----"
          )}
        </p>
        <p className="md:text-2xl">
          Sex : {params?.gender ? <span>{params.gender} </span> : "----"} {"  "};
          Age : {params?.age ? <span>{params.age} </span> : "----"} ans{" "}
        </p>
        <p className="md:text-2xl">
          Phone : {params?.phone ? <span>{params.phone} </span> : "0000"}{" "}
        </p>
        <p className="md:text-2xl">
          Adress : {params?.address ? <span>{params.address} </span> : "----"}{" "}
        </p>
      </div>
    </article>
  );
}

export default Messsage;
