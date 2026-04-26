const KEY_ITEMS = "fb_items";
const KEY_FAVS  = "fb_favs";
const KEY_VIEW  = "fb_view_id";
const KEY_REQUESTS = "fb_requests";
const KEY_REQUEST_VIEW = "fb_request_view_id";

function seedIfMissing() {
  if (localStorage.getItem(KEY_ITEMS)) return;

  const seed = [
    { id:"drill", name:"Power Drill", category:"Tools",   location:"Near you", desc:"Available for short-term borrowing", owner:"Dana", available:true,  media:"https://www.youtube.com/embed/yj0eT1Yh8A4?si=CShtK7_oLC5rEi82"},
    { id:"mixer", name:"Mixer",      category:"Kitchen", location:"2.4 km",    desc:"Perfect for baking projects",       owner:"Noa",  available:true,  media:"https://www.youtube.com/embed/MuHAAGV-f30?si=drDz4nBPT4IrlKYj" },
    { id:"tent",  name:"Camping Tent",category:"Camping",location:"4.8 km",    desc:"Weekend use available",            owner:"Amit", available:false, media:"https://www.youtube.com/embed/jCgcoNpBZa8?si=vCIJ40kvHNsAeDkx" }
  ];
  localStorage.setItem(KEY_ITEMS, JSON.stringify(seed));
}

function getItems() {
  try { return JSON.parse(localStorage.getItem(KEY_ITEMS) || "[]"); }
  catch { return []; }
}

function getFavs() {
  try { return JSON.parse(localStorage.getItem(KEY_FAVS) || "[]"); }
  catch { return []; }
}

function setFavs(arr) {
  localStorage.setItem(KEY_FAVS, JSON.stringify(arr));
}

function getRequests() {
  try { return JSON.parse(localStorage.getItem(KEY_REQUESTS) || "[]"); }
  catch { return []; }
}

function setRequests(arr) {
  localStorage.setItem(KEY_REQUESTS, JSON.stringify(arr));
}


function setStatus(msg, kind) {
  
  const $s = $("#statusArea");
  if (!$s.length) return;
  $s.text(msg || "");
  $s.removeClass("text-success text-danger text-warning");
  if (kind === "success") $s.addClass("text-success");
  if (kind === "danger")  $s.addClass("text-danger");
  if (kind === "warning") $s.addClass("text-warning");
}

function wireNotImplemented() {
  $(".not-implemented")
    .attr("title", "Not implemented yet")
    .on("mouseenter", () => setStatus("This feature is not implemented yet.", "warning"))
    .on("mouseleave", () => setStatus(""))
    .on("click", function (e) {
      e.preventDefault();
      alert("Not implemented yet"); 
    });
}

function openItem(id) {
  localStorage.setItem(KEY_VIEW, id);
  window.location.href = "item.html";
}

function openRequest(requestId) {
  localStorage.setItem(KEY_REQUEST_VIEW, requestId);
  window.location.href = "request.html";
}

function isValidDates(startDate, endDate) {
  if (!startDate || !endDate) return false;
  return new Date(startDate) <= new Date(endDate);
}

function collectRequestDetails(existingRequest) {
  const defaultMessage = existingRequest ? existingRequest.message : "Hi! Can I borrow this item?";
  const defaultStart = existingRequest ? existingRequest.startDate : "";
  const defaultEnd = existingRequest ? existingRequest.endDate : "";

  const message = prompt("Write a short message to the owner:", defaultMessage);
  if (message === null) return null;

  const startDate = prompt("Enter start date (YYYY-MM-DD):", defaultStart);
  if (startDate === null) return null;

  const endDate = prompt("Enter end date (YYYY-MM-DD):", defaultEnd);
  if (endDate === null) return null;

  if (!isValidDates(startDate, endDate)) {
    alert("Invalid dates. Start date must be before or equal to end date.");
    return null;
  }

  return {
    message: message || "(no message)",
    startDate: startDate,
    endDate: endDate
  };
}

function renderResults(list) {
  const $grid = $("#resultsGrid");
  if (!$grid.length) return;

  $grid.empty();

  if (!list.length) {
    $grid.append(`<div class="col-12"><div class="alert alert-info mb-0">No items found.</div></div>`);
    return;
  }

  list.forEach(it => {
    const badge = it.available
      ? `<span class="badge bg-success">Available</span>`
      : `<span class="badge bg-secondary">Unavailable</span>`;


    $grid.append(`
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 card-hover item-card" data-id="${it.id}" style="cursor:pointer;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="h5 mb-0">${it.name}</h3>
              ${badge}
            </div>
            <p class="text-muted mt-2 mb-2">${it.category} • ${it.location}</p>
            <p class="mb-0">${it.desc}</p>
            <div class="small text-muted mt-3">Click to view details</div>
          </div>
        </div>
      </div>
    `);
  });

  $(".item-card").off("click").on("click", function () {
    openItem($(this).data("id"));
  });
}

function wireSearch() {
  const $form = $("#searchForm");
  if (!$form.length) return;

  renderResults(getItems());

  $form.on("submit", function (e) {
    e.preventDefault();
    const q = ($("#searchInput").val() || "").toLowerCase();   
    const cat = $("#categorySelect").val() || "All";

    const filtered = getItems().filter(it => {
      const matchQ = !q || it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q);
      const matchC = (cat === "All") || (it.category === cat);
      return matchQ && matchC;
    });

    setStatus(`Showing results for: "${q || "all"}"`, "success");
    renderResults(filtered);
  });

  $("#clearBtn").on("click", function () {
    $("#searchInput").val("");
    $("#categorySelect").val("All");
    setStatus("Showing all items.", "success");
    renderResults(getItems());
  });
}


function wireMyItems() {
  const $list = $("#myItemsList");
  if (!$list.length) return;

  const items = getItems();
  const favs = getFavs();
  const favItems = favs.map(id => items.find(x => x.id === id)).filter(Boolean);

  $list.empty();

  if (!favItems.length) {
    $list.append(`<div class="alert alert-info mb-0">No saved items yet. Go to Search and open an item to Save it.</div>`);
    return;
  }

  favItems.forEach(it => {

    $list.append(`
      <div class="card mb-3 card-hover item-card" data-id="${it.id}" style="cursor:pointer;">
        <div class="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <h3 class="h5 mb-1">${it.name}</h3>
            <div class="text-muted">${it.category} • ${it.location} • Owner: ${it.owner}</div>
            <div class="mt-2">${it.desc}</div>
          </div>
          <div class="d-flex align-items-start gap-2">
            <button class="btn btn-outline-danger btn-sm btn-remove" data-id="${it.id}">Remove</button>
          </div>
        </div>
      </div>
    `);
  });


  $(".item-card").off("click").on("click", function () {
    openItem($(this).data("id"));
  });


  $(".btn-remove").off("click").on("click", function (e) {
    e.stopPropagation();
    const id = $(this).data("id");
    const next = getFavs().filter(x => x !== id);
    setFavs(next);
    alert("Removed from My Items."); 
    setStatus("Item removed.", "danger");
    wireMyItems(); 
  });
}


function wireItem() {
  if (!$("#itemName").length) return;

  const id = localStorage.getItem(KEY_VIEW);
  const it = getItems().find(x => x.id === id);

  if (!it) {
    $("#itemContainer").html(`<div class="alert alert-warning">No item selected. Go back to Search.</div>`);
    return;
  }

  $("#itemName").text(it.name);
  $("#itemMeta").text(`${it.category} • ${it.location} • Owner: ${it.owner}`);
  $("#itemDesc").text(it.desc);
  $("#mediaFrame").attr("src", it.media);

  $("#availabilityBadge")
    .text(it.available ? "Available" : "Unavailable")
    .removeClass("bg-success bg-secondary")
    .addClass(it.available ? "bg-success" : "bg-secondary");


  function refreshSaveBtn() {
    const favs = getFavs();
    const saved = favs.includes(it.id);
    $("#saveBtn").text(saved ? "Unsave" : "Save");
  }
  refreshSaveBtn();

  $("#saveBtn").off("click").on("click", function () {
    const favs = getFavs();
    const idx = favs.indexOf(it.id);
    if (idx >= 0) favs.splice(idx, 1); else favs.push(it.id);
    setFavs(favs);
    alert("Saved status updated.");
    setStatus("Saved list updated.", "success");
    refreshSaveBtn();
  });

 
  $("#requestBtn").off("click").on("click", function () {
    const details = collectRequestDetails(null);
    if (!details) return;

    const requests = getRequests();

    requests.push({
      requestId: "req_" + Date.now(),
      itemId: it.id,
      status: "Pending",
      message: details.message,
      startDate: details.startDate,
      endDate: details.endDate
    });

    setRequests(requests);
    alert("Request sent successfully.");
    window.location.href = "my-requests.html";
  });
}

function wireMyRequests() {
  const $list = $("#myRequestsList");
  if (!$list.length) return;

  const requests = getRequests();
  const items = getItems();

  $list.empty();

  if (!requests.length) {
    $list.append(`<div class="alert alert-info mb-0">You have not sent any requests yet.</div>`);
    return;
  }

  requests.forEach(req => {
    const it = items.find(x => x.id === req.itemId);
    if (!it) return;

    $list.append(`
      <div class="card mb-3 card-hover request-card" data-id="${req.requestId}">
        <div class="card-body">
          <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
            <div>
              <h3 class="h5 mb-1">${it.name}</h3>
              <div class="text-muted">${it.category} • ${it.location} • Owner: ${it.owner}</div>
              <div class="mt-2">${req.startDate} → ${req.endDate}</div>
            </div>
            <div>
              <span class="badge bg-warning text-dark">${req.status}</span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  $(".request-card").off("click").on("click", function () {
    openRequest($(this).data("id"));
  });
}

function wireRequestDetails() {
  if (!$("#requestDetailsContainer").length) return;

  const requestId = localStorage.getItem(KEY_REQUEST_VIEW);
  const requests = getRequests();
  const req = requests.find(x => x.requestId === requestId);

  if (!req) {
    $("#requestDetailsContainer").html(`<div class="alert alert-warning">Request not found. Go back to My Requests.</div>`);
    return;
  }

  const it = getItems().find(x => x.id === req.itemId);

  if (!it) {
    $("#requestDetailsContainer").html(`<div class="alert alert-warning">Item not found.</div>`);
    return;
  }

  $("#requestItemName").text(it.name);
  $("#requestItemMeta").text(`${it.category} • ${it.location} • Owner: ${it.owner}`);
  $("#requestItemDesc").text(it.desc);
  $("#requestStatusBadge").text(req.status);
  $("#requestStartDate").text(req.startDate);
  $("#requestEndDate").text(req.endDate);
  $("#requestMessage").text(req.message);

  $("#editRequestBtn").off("click").on("click", function () {
    const updated = collectRequestDetails(req);
    if (!updated) return;

    req.message = updated.message;
    req.startDate = updated.startDate;
    req.endDate = updated.endDate;

    setRequests(requests);
    alert("Request updated.");
    setStatus("Request updated successfully.", "success");
    wireRequestDetails();
  });

  $("#cancelRequestBtn").off("click").on("click", function () {
    const confirmCancel = confirm("Are you sure you want to cancel this request?");
    if (!confirmCancel) return;

    const next = requests.filter(x => x.requestId !== requestId);
    setRequests(next);

    alert("Request cancelled.");
    window.location.href = "my-requests.html";
  });
}

$(function () {
  seedIfMissing();
  wireNotImplemented();
  wireSearch();
  wireMyItems();
  wireItem();
  wireMyRequests();
  wireRequestDetails();
});
