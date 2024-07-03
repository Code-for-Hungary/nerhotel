import { FaShoppingBasket, FaSpa, FaWineBottle } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdCasino, MdLocalBar, MdLocalCafe, MdOutlineRestaurant, MdSelectAll } from "react-icons/md";
import { TbHotelService } from "react-icons/tb";
import styles from "../css/map-list-opener.module.css";
import { FaFilter } from "react-icons/fa6";
import { useState, useEffect, useCallback } from "react";

function FilterControl({ filterType, setFilterType }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const size = 16;
    const options = [
        { type: "mind", category: "all", name: "Alles", icon: <MdSelectAll size={size} /> },
        { type: "bár", category: "bar", name: "Bar", icon: <MdLocalBar size={size} /> },
        { type: "borászat", category: "winery", name: "Weingut", icon: <FaWineBottle size={size} /> },
        { type: "étterem", category: "restaurant", name: "Restaurant", icon: <MdOutlineRestaurant size={size} /> },
        { type: "kávézó", category: "café", name: "Cafe", icon: <MdLocalCafe size={size} /> },
        { type: "spa&sport", category: "spa&sport", name: "Spa und Sport", icon: <FaSpa size={size} /> },
        { type: "kaszinó", category: "casino", name: "Kasino", icon: <MdCasino size={size} /> },
        { type: "kemping", category: "camping", name: "Camping", icon: <GiCampingTent size={size} /> },
        { type: "kiskereskedelem", category: "retail", name: "Einzelhandel", icon: <FaShoppingBasket size={size} /> },
        { type: "szálloda", category: "hotel", name: "Hotel", icon: <TbHotelService size={size} /> },
    ];
    const toggleFilterOpen = useCallback(() => {
        setFilterOpen((prevState) => !prevState);
    }, []);

    return (
        <>
            <button className={`${styles.controlButton} ${styles.filterOpenButton}`} onClick={toggleFilterOpen}>
                <FaFilter />
            </button>
            <div className={` ${styles.filterPanelWrapper} ${filterOpen && styles.filterOpen}`} key={filterOpen ? "open" : "closed"}>
                <div className={`${styles.filterPanel}`}>
                    {options.map((option, i) => (
                        <div
                            className={`${filterType === option.type && styles.selectedRow} 
                                ${styles.filterRow}
                                ${i !== options.length - 1 && styles.filterRowSeparator}`}
                            onClick={() => setFilterType(option.type)}
                        >
                            <button className={`${styles.filterButton}`}>{option.icon}</button>
                            <span>{option.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FilterControl;
