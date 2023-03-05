import Avatar from "components/avatar"
// profile component with compose data and hacker data from hackathon smart contract

export default function Profile({ name, wallet, skills, role}) {
    return (
      <div className="flex flex-col items-center rounded-lg bg-black shadow-lg p-4">
        <Avatar size="large"/>
        <div className="px-6 py-4">
          <div className="font-bold text-purple-500 text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{wallet}</p>
          <p className="text-gray-700 text-base">{skills}</p>
          <p className="text-gray-700 text-base">{role}</p>
        </div>
      </div>
    );
  };

