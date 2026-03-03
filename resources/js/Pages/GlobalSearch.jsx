import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/global-search.css";
import { mockData } from "../data/mockData";

export default function GlobalSearch() {
  const navigate = useNavigate();
  const dataset = {
  contacts: [
    ...(mockData?.leads?.contacts || []),
    ...(mockData?.opportunities?.contacts || [])
  ],
  companies: [
    ...(mockData?.leads?.companies || []),
    ...(mockData?.opportunities?.companies || [])
  ],
  opportunities: [
    ...(mockData?.leads?.opportunities || []),
    ...(mockData?.opportunities?.opportunities || [])
  ]
};
const [query, setQuery] = useState("");
  const [selectedBU, setSelectedBU] = useState("All");
  const [showAdvanced, setShowAdvanced] = useState(false);
const [basicOwner, setBasicOwner] = useState("");
const [basicLifecycle, setBasicLifecycle] = useState("");
const [basicStage, setBasicStage] = useState("");
const resetBasicFilters = () => {
  setQuery("");
  setSelectedBU("All");
  setBasicOwner("");
  setBasicLifecycle("");
  setBasicStage("");
};
  /* ===== ADVANCED STATE ===== */

  const [advBusinessUnit, setAdvBusinessUnit] = useState("");
  const [advOwner, setAdvOwner] = useState("");
  const [advCountry, setAdvCountry] = useState("");
  const [advCreatedDate, setAdvCreatedDate] = useState("");
  const [advUpdatedDate, setAdvUpdatedDate] = useState("");

  const [advLifecycle, setAdvLifecycle] = useState("");
  const [advHasMeetingScheduled, setAdvHasMeetingScheduled] = useState("");
  const [advSlaStatus, setAdvSlaStatus] = useState("");

  const [advStage, setAdvStage] = useState("");
  const [advDealValue, setAdvDealValue] = useState("");
  const [advCloseDate, setAdvCloseDate] = useState("");
  const [advExceptionType, setAdvExceptionType] = useState("");

  const [advLastActivityDate, setAdvLastActivityDate] = useState("");
  const [advLastMarketingDate, setAdvLastMarketingDate] = useState("");
  const [advNoUpdateDays, setAdvNoUpdateDays] = useState("");


  const resetAdvanced = () => {
    setAdvBusinessUnit("");
    setAdvOwner("");
    setAdvCountry("");
    setAdvCreatedDate("");
    setAdvUpdatedDate("");
    setAdvLifecycle("");
    setAdvHasMeetingScheduled("");
    setAdvSlaStatus("");
    setAdvStage("");
    setAdvDealValue("");
    setAdvCloseDate("");
    setAdvExceptionType("");
    setAdvLastActivityDate("");
    setAdvLastMarketingDate("");
    setAdvNoUpdateDays("");
  };
  /* ===== DYNAMIC DROPDOWN OPTIONS ===== */

const allItems = [
  ...dataset.contacts,
  ...dataset.companies,
  ...dataset.opportunities
];

const owners = [...new Set(allItems.map(i => i.owner).filter(Boolean))];
const countries = [...new Set(allItems.map(i => i.country).filter(Boolean))];
const lifecycles = [...new Set(allItems.map(i => i.lifecycle).filter(Boolean))];
const stages = [...new Set(allItems.map(i => i.stage).filter(Boolean))];

  /* ================= FILTER ================= */

  const filterItems = (items) =>
    items.filter((item) => {
      const search = query.toLowerCase();

      const fullName =
        item.firstName && item.lastName
          ? `${item.firstName} ${item.lastName}`.toLowerCase()
          : "";

      const name = item.name?.toLowerCase() || "";

      const searchMatch =
        search === "" ||
        fullName.includes(search) ||
        name.includes(search) ||
        item.email?.toLowerCase().includes(search);

      const basicMatch =
        selectedBU === "All" || item.businessUnit === selectedBU;
      
        const basicOwnerMatch =
  basicOwner === "" || item.owner === basicOwner;

const basicLifecycleMatch =
  basicLifecycle === "" || item.lifecycle === basicLifecycle;

const basicStageMatch =
  basicStage === "" || item.stage === basicStage;
      const advancedMatch =
        (advBusinessUnit === "" || item.businessUnit === advBusinessUnit) &&
        (advOwner === "" || item.owner === advOwner) &&
        (advCountry === "" || item.country === advCountry) &&
        (advLifecycle === "" || item.lifecycle === advLifecycle) &&
        (advStage === "" || item.stage === advStage);

      return (
  searchMatch &&
  basicMatch &&
  basicOwnerMatch &&
  basicLifecycleMatch &&
  basicStageMatch &&
  advancedMatch
);
    });

  const contacts = useMemo(
    () => filterItems(dataset.contacts),
   [
  query,
  selectedBU,
  basicOwner,
  basicLifecycle,
  basicStage,
  advBusinessUnit,
  advOwner,
  advCountry,
  advLifecycle,
  advStage
]
  );

  const companies = useMemo(
    () => filterItems(dataset.companies),
    [contacts]
  );

  const opportunities = useMemo(
    () => filterItems(dataset.opportunities),
    [contacts]
  );

  return (
    <div className="gs-page">
      <div className="gs-container">

        <div className="gs-header">
          <h2>Global Search</h2>
          <div className="search-wrapper">
            <input
              placeholder="Search Deals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="bu-group">
            {["All", "Retail", "Alliance", "Enterprise"].map((bu) => (
              <button
                key={bu}
                className={selectedBU === bu ? "active" : ""}
                onClick={() => setSelectedBU(bu)}
              >
                {bu}
              </button>
            ))}
          </div>
<div className="basic-dropdown-group">

  <select
    value={basicOwner}
    onChange={(e) => setBasicOwner(e.target.value)}
  >
    <option value="">Owner</option>
    {owners.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>

  <select
    value={basicLifecycle}
    onChange={(e) => setBasicLifecycle(e.target.value)}
  >
    <option value="">Lifecycle</option>
    {lifecycles.map((l) => (
      <option key={l} value={l}>{l}</option>
    ))}
  </select>

  <select
    value={basicStage}
    onChange={(e) => setBasicStage(e.target.value)}
  >
    <option value="">Stage</option>
    {stages.map((s) => (
      <option key={s} value={s}>{s}</option>
    ))}
  </select>
<button
  className="reset-basic-btn"
  onClick={resetBasicFilters}
>
  Reset
</button>
</div>
          <button
            className="advanced-btn"
            onClick={() => setShowAdvanced(true)}
          >
            Advanced Filters
          </button>
        </div>

        <Gallery title="Contacts" items={contacts} type="Contact" navigate={navigate}/>
        <Gallery title="Companies" items={companies} type="Company" navigate={navigate}/>
        <Gallery title="Opportunities" items={opportunities} type="Opportunity" navigate={navigate}/>
      </div>

      {/* ================= ADV PANEL ================= */}

      <div
        className={`adv-overlay ${showAdvanced ? "show" : ""}`}
        onClick={() => setShowAdvanced(false)}
      />

      <div className={`adv-panel ${showAdvanced ? "open" : ""}`}>

  <div className="adv-header">
    <h3>Advanced Filters</h3>

    <div className="adv-header-actions">
      <button
        className="reset-btn"
        onClick={resetAdvanced}
      >
        Reset
      </button>

      <button
        className="close-btn"
        onClick={() => setShowAdvanced(false)}
      >
        ×
      </button>
    </div>
  </div>
        

        {/* ===== GENERAL ===== */}
        <Select label="Business Unit" value={advBusinessUnit} setValue={setAdvBusinessUnit} options={["Retail","Alliance","Enterprise"]}/>
        <Select label="Deal Owner" value={advOwner} setValue={setAdvOwner} options={owners}/>
         <Select label="Country" value={advCountry} setValue={setAdvCountry} options={countries}/> 
        <DateInput label="Created Date" value={advCreatedDate} setValue={setAdvCreatedDate}/>
        <DateInput label="Last Updated Date" value={advUpdatedDate} setValue={setAdvUpdatedDate}/>

        {/* ===== LEAD ===== */}
        <Select label="Lifecycle" value={advLifecycle} setValue={setAdvLifecycle} options={lifecycles}/>
        <Select label="Has Meeting Scheduled" value={advHasMeetingScheduled} setValue={setAdvHasMeetingScheduled} options={["Yes","No"]}/>
        <Select label="SLA Status" value={advSlaStatus} setValue={setAdvSlaStatus} options={["On Track","Delayed"]}/>

        {/* ===== OPPORTUNITY ===== */}
         
        <NumberInput label="Deal Value ≥" value={advDealValue} setValue={setAdvDealValue}/>
        <DateInput label="Close Date ≤" value={advCloseDate} setValue={setAdvCloseDate}/>
        <Select label="Exception Type" value={advExceptionType} setValue={setAdvExceptionType} options={["None","Pricing Exception"]}/>

        {/* ===== ACTIVITY ===== */}
        <DateInput label="Last Activity Date" value={advLastActivityDate} setValue={setAdvLastActivityDate}/>
        <DateInput label="Last Marketing Date" value={advLastMarketingDate} setValue={setAdvLastMarketingDate}/>
        <NumberInput label="No Update in X Days ≤" value={advNoUpdateDays} setValue={setAdvNoUpdateDays}/>

        <button className="apply-btn" onClick={() => setShowAdvanced(false)}>
          Apply
        </button>
      </div>
    </div>
  );
}

/* ===== REUSABLE ===== */

function Select({ label, value, setValue, options = [] }) {
  return (
    <div className="filter-box">
      <label>{label}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">All</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function DateInput({ label, value, setValue }) {
  return (
    <div className="filter-box">
      <label>{label}</label>
      <input type="date" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function NumberInput({ label, value, setValue }) {
  return (
    <div className="filter-box">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
/* ================= GALLERY ================= */

function Gallery({ title, items, type, navigate }) {
  return (
    <div className="gallery-section">
      <h3>{title}</h3>
      <div className="gallery-card">
        {items.length === 0 ? (
          <div className="empty-message">No data found</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="result-row">
              <div className="result-left">

                <div className="row-header">
                  <div className="row-title">
                    {item.firstName
                      ? `${item.firstName} ${item.lastName}`
                      : item.name}
                  </div>

                  {item.slaStatus && (
                    <div
                      className={`status-badge ${
                        item.slaStatus === "On Track"
                          ? "badge-green"
                          : "badge-red"
                      }`}
                    >
                      {item.slaStatus}
                    </div>
                  )}
                </div>

                <div className="row-subinfo">
                  {item.leadId && (
                    <div className="info-pill">{item.leadId}</div>
                  )}
                  {item.email && (
                    <div className="info-pill">{item.email}</div>
                  )}
                  {item.owner && (
                    <div className="info-pill">{item.owner}</div>
                  )}
                </div>

                <div className="tags">
                  {item.businessUnit && (
                    <div className="tag">BU: {item.businessUnit}</div>
                  )}
                  {item.stage && (
                    <div className="tag">Status: {item.stage}</div>
                  )}
                </div>

              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate(
                    type === "Contact"
                      ? "/contacts"
                      : type === "Company"
                      ? "/companies"
                      : "/opportunities"
                  )
                }
              >
                Open {type} Detail
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 