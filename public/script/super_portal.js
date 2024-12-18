document.getElementById("search-btn").addEventListener("click", () => {
    const params = new URLSearchParams();

    // Collect filter values
    const filters = [
        { id: "filter-user-id", key: "userId" },
        { id: "filter-transport-id", key: "transportId" },
        { id: "filter-service-id", key: "serviceId" },
        { id: "filter-phone", key: "phone" },
        { id: "filter-first-name", key: "firstName" },
        { id: "filter-last-name", key: "lastName" },
        { id: "filter-state", key: "state" },   
        { id: "filter-activity", key: "activity" },
        { id: "filter-city", key: "city" },
        { id: "filter-country", key: "country" },
        { id: "filter-recruited", key: "recruited" },

        // Combined date filters for start and end
        { id: "filter-recruitment-approval-start", key: "recruitmentApprovalDateStart" },
        { id: "filter-recruitment-approval-end", key: "recruitmentApprovalDateEnd" },
        { id: "filter-recruitment-date-start", key: "dateOfRecruitmentStart" },
        { id: "filter-recruitment-date-end", key: "dateOfRecruitmentEnd" }
    ];

    // Append non-empty values to params
    filters.forEach(({ id, key }) => {
        const value = document.getElementById(id).value.trim();
        if (value) {
            params.append(key, value);
        }
    });

    // Redirect to portal route with query params
    window.location.href = `/portal?${params.toString()}`;
});




document.querySelector(".heading").addEventListener("click", () => {
    // Redirect to base route without filters
    
    window.location.href = `/`;
});
document.querySelector(".refresh").addEventListener("click", () => {
    // Redirect to base route without filters
    
    window.location.href = `/portal`;
});
document.querySelector(".refresh2").addEventListener("click", () => {
    // Redirect to base route without filters
    
    window.location.href = `/portal`;
});



function editDriver(button) {
    const driverId = button.closest(".driver-item").dataset.driverId;
    window.location.href = `edit_driver/?id=${driverId}`;
}





// section-2

function openSearchPopup() {
    
    document.getElementById("searchPopup").style.display = "flex";
}

function closeSearchPopup() {
    document.getElementById("searchPopup").style.display = "none";
}
function addDriver() {
    window.location.href = `/add_driver`; 

}

const find=document.querySelector(".find")
find.addEventListener("click",()=>{
    event.preventDefault(); 
    const params = new URLSearchParams();

    // Define the filter fields
    const filters = [
        { id: "popup-user-id", key: "userId" },
        { id: "popup-phone", key: "phone" },
        { id: "popup-first-name", key: "firstName" },
        { id: "popup-last-name", key: "lastName" },
        { id: "popup-state", key: "state" },
        { id: "popup-city", key: "city" },
        { id: "popup-transport-id", key: "transportId" },
        { id: "popup-service-id", key: "serviceId" },
        { id: "popup-activity", key: "activity" },
        { id: "popup-country", key: "country" },
        { id: "popup-recruitment-approval-start", key: "recruitmentApprovalStart" },
        { id: "popup-recruitment-approval-end", key: "recruitmentApprovalEnd" },
        { id: "popup-recruitment-date-start", key: "recruitmentDateStart" },
        { id: "popup-recruitment-date-end", key: "recruitmentDateEnd" },
        { id: "popup-recruited", key: "recruited" }
    ];

    // Append non-empty values to the params
    filters.forEach(({ id, key }) => {
        const value = document.getElementById(id).value.trim();
        console.log(`Value for ${key}:`, value);
        
        if (value) {
            params.append(key, value);
        }
    });
    console.log("sdjb");
    
    // Log or redirect with the query params
    console.log("Query Params:", params.toString()); // For debugging
    window.location.href = `/portal?${params.toString()}`; 
    closeSearchPopup(); 
})
// function submitSearch() {
//     const params = new URLSearchParams();

//     // Define the filter fields
//     const filters = [
//         { id: "popup-user-id", key: "userId" },
//         { id: "popup-phone", key: "phone" },
//         { id: "popup-first-name", key: "firstName" },
//         { id: "popup-last-name", key: "lastName" },
//         { id: "popup-state", key: "state" },
//         { id: "popup-city", key: "city" },
//         { id: "popup-transport-id", key: "transportId" },
//         { id: "popup-service-id", key: "serviceId" },
//         { id: "popup-activity", key: "activity" },
//         { id: "popup-country", key: "country" },
//         { id: "popup-recruitment-approval-start", key: "recruitmentApprovalStart" },
//         { id: "popup-recruitment-approval-end", key: "recruitmentApprovalEnd" },
//         { id: "popup-recruitment-date-start", key: "recruitmentDateStart" },
//         { id: "popup-recruitment-date-end", key: "recruitmentDateEnd" },
//         { id: "popup-recruited", key: "recruited" }
//     ];

//     // Append non-empty values to the params
//     filters.forEach(({ id, key }) => {
//         const value = document.getElementById(id).value.trim();
//         console.log(value );
        
//         if (value) {
//             params.append(key, value);
//         }
//     });
//     console.log("sdjb");
    
//     // Log or redirect with the query params
//     console.log("Query Params:", params.toString()); // For debugging
//     // window.location.href = `/portal?${params.toString()}`; 
//     closeSearchPopup(); // Close the popup
// }
