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




document.querySelector(".referesh").addEventListener("click", () => {
    // Redirect to base route without filters
    window.location.href = `/portal`;
});



function editDriver(button) {
    const driverId = button.closest(".driver-item").dataset.driverId;
    window.location.href = `edit_driver/?id=${driverId}`;
}
