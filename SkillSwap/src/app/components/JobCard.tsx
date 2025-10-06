export default function JobCard(){
    return(
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
            <img src="./src/app/assets/gardening.jpeg" alt="Job Image" className="w-full h-48 object-cover rounded-md mb-4"/>
            <h3 className="text-lg font-semibold mb-2">Mowing lawn</h3>
            <p className="text-gray-600 mb-2">Gardening</p>
            <p className="text-green-600 font-medium mb-4">$20</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"> Request Job</button>
        </div>
    )
}