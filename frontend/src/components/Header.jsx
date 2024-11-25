export default function Header() {
    return (
        <>
            <div className="h-40 w-full bg-gray-50">
                <div className="h-28 flex justify-center items-start relative">
                    <img src="src/assets/carandall.svg" className="mt-4" />
                    <img
                        src="src/assets/placeholder.png"
                        className="w-16 h-auto rounded-full absolute right-0 mr-12 mt-8"
                    />
                </div>
                <div className="flex h-12 justify-center space-x-8 mt-2 font-Alata text-2xl">
                    <a>Home</a>
                    <a>Contact</a>
                    <a>Inloggen</a>
                    <a>Aanbod</a>
                    <a>Abonnementbeheer</a>
                </div>
            </div>
        </>
    );
}
