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
    <article className="cards">
      <div>
        <img src={params?.picture ? params.picture : ""} alt="" />
      </div>
      <div className="info">
        <p className="nomPrenom">
          {params?.firstName ? <span>{params.firstName} </span> : "----"}{" "}
          {params?.lastName ? (
            <span>{params.lastName.toUpperCase()} </span>
          ) : (
            "----"
          )}
        </p>
        <p className="autre">
          Sex : {params?.gender ? <span>{params.gender} </span> : "----"} {"  "};
          Age : {params?.age ? <span>{params.age} </span> : "----"} ans{" "}
        </p>
        <p className="autre">
          Phone : {params?.phone ? <span>{params.phone} </span> : "0000"}{" "}
        </p>
        <p className="autre">
          Adress : {params?.address ? <span>{params.address} </span> : "----"}{" "}
        </p>
      </div>
    </article>
  );
}

export default Messsage;
