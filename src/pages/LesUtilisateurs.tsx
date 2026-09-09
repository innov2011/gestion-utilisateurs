import Messsage from "../composants/Message";

type Message = {
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

type Params = {
  donnees: Message[];
};

function Donnees(params: Params) {
  const donnees = params.donnees;
  return (
    <section className="container mx-auto p-5 grid md:grid-cols-2 gap-5 bg-gray-300">
      {" "}
      {donnees.map(
        ({
          lastName,
          firstName,
          address,
          phone,
          gender,
          age,
          picture,
        }: Message) => (
          <Messsage
            firstName={firstName}
            lastName={lastName}
            address={address}
            phone={phone}
            gender={gender}
            age={age}
            picture={picture}
          />
        ),
      )}
    </section>
  );
}
export default Donnees;
