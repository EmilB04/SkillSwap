import Header from "../components/Header";
import Footer from '../components/Footer';
import JobCard from "../components/JobCard";

export default function Explore(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header/>
            <main className="max-w-3/4 justify-center mx-auto px-6 py-3">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h1 className="text-2xl font-bold mb-2">Explore Jobs</h1>
                    <p className="mb-2">Filter and find the perfect job for you</p>
                    <div className="p-4 pl-0">
                        <form className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <label htmlFor="date" className="font-bold">Date:</label>
                                <input type="date" name="date" className="p-2 border rounded-md" />
                            </div>

                            <div className="flex flex-row gap-4 items-center">
                                <legend className="mr-2 font-bold">Payment:</legend>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="radio" 
                                            id="cash" 
                                            name="payment" 
                                            value="cash"
                                            className="form-radio h-4 w-4 text-blue-600" />
                                        <label htmlFor="cash" className="text-sm">Cash</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="radio" 
                                            id="swap" 
                                            name="payment" 
                                            value="swap"
                                            className="form-radio h-4 w-4 text-blue-600" />
                                        <label htmlFor="swap" className="text-sm">Swap</label>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">Search</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-12 justify-center">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}