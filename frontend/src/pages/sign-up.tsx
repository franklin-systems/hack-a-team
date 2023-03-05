import { useHackthon } from "hooks/useHackathon";
import { useProvider } from "hooks/useProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "utils/auth";


export default function SignUp() {
  let auth = useAuth();
  let navigate = useNavigate();

  const onSubmit = function(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let formData = new FormData(event.currentTarget);

    if (auth.wallet) {
      auth.signin(formData.get("name") as string, () => {
        console.log("Signed in!")
        const provider = useProvider()
        const hackathon = useHackthon(provider, auth.wallet)

        if (formData.get("role") === "captain") {
          hackathon.registerAsCaptain(formData.get("role"))
        } else {
          hackathon.registerAsHacker(formData.get("role"))
        }

        navigate("/active")
      })
    } else {
      alert("Please connect your wallet first.")
    }
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">
              Hacker Profile Information
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Whether you're a <span className="italic">Hacker</span> or a <span className="italic">Captain</span>, fill out your profile information.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              This information will be linked with your wallet address: 0x00..00, and shared with prospective captains and fellow team members.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white sm:pt-1.5">
                Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-white sm:pt-1.5">
                Team Role
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="role"
                  name="role"
                  className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select One...</option>
                  <option value="0">Developer</option>
                  <option value="1">Designer</option>
                  <option value="2">Project Manager</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="skills" className="block text-sm font-medium leading-6 text-white sm:pt-1.5">
                Skills
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  name="skills"
                  id="skills"
                  className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-6 sm:space-y-5 pt-12">
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">
              What role are you joining as?
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              A <span className="italic">Hacker</span> is a team member who is looking to join a team and contribute to a project.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              A <span className="italic">Captain</span> is a team member who is looking to recruit a team and build a project.
            </p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 grow mr-4">
              <input defaultChecked id="user-type-hacker" type="radio" value="hacker" name="user-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="user-type-hacker" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Hacker
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 grow ml-4">
              <input id="user-type-captain" type="radio" value="captain" name="user-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="user-type-captain" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Captain
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-x-3">
          <a
            href="/"
            type="button"
            className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
