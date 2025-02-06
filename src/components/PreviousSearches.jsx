import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { RECIPE_API } from "../api/config";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PreviousSearches() {
    const searches = ['pizza', 'burger', 'cookies', 'juice', 'biriyani', 'salad', 'ice cream', 'lasagma', 'pudding', 'soup'];
    const [categories, setCategories] = useState([]);
    const [area, setArea] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filterType, setFilterType] = useState('default');
    const [filterOptions, setFilterOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const itemsPerPage = 10; // Number of items to display per page

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.all([
                    (await RECIPE_API.get('/list.php?c=list')).data.meals,
                    (await RECIPE_API.get('/list.php?a=list')).data.meals,
                    (await RECIPE_API.get('/list.php?i=list')).data.meals
                ]).then(axios.spread((fetchedCategories, fetchedArea, fetchedIngredients) => {
                    setCategories(fetchedCategories.map(item => item.strCategory));
                    setArea(fetchedArea.map(item => item.strArea));
                    setIngredients(fetchedIngredients.map(item => item.strIngredient));
                }));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Handle filter type change
    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilterType(selectedFilter);
        updateFilterOptions(selectedFilter);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    // Update filter options based on the selected filter type
    const updateFilterOptions = (selectedFilter) => {
        switch (selectedFilter) {
            case 'categories':
                setFilterOptions(categories);
                break;
            case 'area':
                setFilterOptions(area);
                break;
            case 'ingredients':
                setFilterOptions(ingredients);
                break;
            default:
                setFilterOptions([...categories, ...area, ...ingredients]); // Combine all for "default"
        }
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);

        // Filter suggestions based on the input and filter type
        const filteredSuggestions = filterOptions.filter(item =>
            item.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setCurrentPage(1); // Reset to the first page when search input changes
    };

    // Update suggestions when filterType or filterOptions change
    useEffect(() => {
        updateFilterOptions(filterType);
    }, [filterType, categories, area, ingredients]);

    // Clear suggestions when search input is empty
    useEffect(() => {
        if (searchInput === '') {
            setSuggestions([]);
        }
    }, [searchInput]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterOptions.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="previous-searches section">
            <h2>Previous searches</h2>
            <div style={{display:"flex",justifyContent: 'space-between', alignItems: 'center'}}>

                <div style={{width: '100%', flex: 0.3, display: 'flex', justifyContent: 'flex-end'}}>
                    <span>Filter by </span>
                    <select name="filter" id="filter" value={filterType} onChange={handleFilterChange} style={{width: '100%'}}>
                        <option value="default">Default</option>
                        <option value="categories">Categories</option>
                        <option value="area">Area</option>
                        <option value="ingredients">Ingredients</option>
                    </select>
                </div>

                <div className="search-box">
                    <button className="btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <input
                        type="text"
                        placeholder="Search for a recipe..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>
            </div>

            {/* Display suggestions */}
            <div className="suggestions-container">
                {suggestions.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
                    <p className="suggestion-item" key={index}>{item}</p>
                ))}
            </div>

            {/* Display paginated options */}
            <div className="previous-searches-container">
                {currentItems.map((item, index) => (
                    <p className="search-item" key={index}>{item}</p>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>{currentPage} of {indexOfLastItem / 10}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= filterOptions.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}