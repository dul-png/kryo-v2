/* Trade Explorer content.
   Each trade: name, category, icon (key into TRADE_ICONS), summary,
   covers (what the trade comprises) and standard (how Stonebridge delivers it). */
window.TRADE_ICONS = {
  hammer: '<path d="M8 40 26 22"/><path d="m22 12 10-6 10 10-6 10z"/><path d="m22 12 4 14"/>',
  bricks: '<rect x="6" y="10" width="36" height="28"/><path d="M6 19h36M6 28h36M18 10v9M30 19v9M18 28v10M30 10v0"/>',
  layers: '<path d="m24 6 18 9-18 9-18-9z"/><path d="m6 24 18 9 18-9"/><path d="m6 33 18 9 18-9"/>',
  roof: '<path d="M4 26 24 8l20 18"/><path d="M10 21v19h28V21"/><path d="M30 12V6h5v10"/>',
  demo: '<path d="M10 40h28"/><path d="M14 40V20h12v20"/><path d="m30 8 10 10-6 6-10-10z"/><path d="m27 21-5 5"/>',
  spark: '<path d="M6 42 22 26"/><path d="m22 26 6-14 14-6-6 14z"/><path d="M34 30l4 4M38 26l4 2M30 34l2 4"/>',
  bolt: '<path d="M27 4 10 27h12l-3 17 19-25H26z"/>',
  drop: '<path d="M24 5s-14 15-14 25a14 14 0 0 0 28 0C38 20 24 5 24 5z"/><path d="M18 31a6 6 0 0 0 6 6"/>',
  flame: '<path d="M24 4c2 8 12 12 12 24a12 12 0 0 1-24 0c0-7 4-10 6-14 2 4 2 7 5 8-1-6 1-12 1-18z"/>',
  snow: '<path d="M24 4v40M7 14l34 20M7 34l34-20"/><path d="m19 8 5 4 5-4M19 40l5-4 5 4"/>',
  key: '<circle cx="16" cy="24" r="8"/><path d="M24 24h18M36 24v7M42 24v5"/>',
  roller: '<rect x="8" y="6" width="28" height="11" rx="2"/><path d="M36 11h4v11H24v6"/><rect x="21" y="28" width="6" height="14" rx="1"/>',
  trowel: '<path d="M6 32 26 12l10 10-20 20z"/><path d="m31 17 8-8 3 3-8 8"/>',
  tiles: '<rect x="6" y="6" width="16" height="16"/><rect x="26" y="6" width="16" height="16"/><rect x="6" y="26" width="16" height="16"/><rect x="26" y="26" width="16" height="16"/>',
  cabinet: '<rect x="6" y="8" width="36" height="32"/><path d="M24 8v32M6 20h36"/><path d="M20 28v4M28 28v4"/>',
  window: '<rect x="8" y="6" width="32" height="36"/><path d="M24 6v36M8 24h32"/><path d="m13 12 6 6"/>',
  deck: '<path d="M4 18h40M8 18v24M40 18v24M4 12l20-6 20 6"/><path d="M16 42V30M24 42V30M32 42V30M12 30h24"/>',
  fence: '<path d="M8 42V12l4-5 4 5v30M22 42V12l4-5 4 5v30M36 42V12l4-5 4 5v30"/><path d="M4 20h44M4 34h44"/>',
  leaf: '<path d="M40 8C16 8 8 20 8 32c0 4 1 7 2 9 4-14 12-20 22-24-9 5-15 12-18 24 22 2 26-18 26-33z"/>',
  house: '<path d="M6 22 24 8l18 14"/><path d="M10 19v21h28V19"/><path d="M20 40V28h8v12"/>',
  office: '<rect x="8" y="6" width="32" height="36"/><path d="M8 18h32M8 30h32M24 18v24"/>',
  wrench: '<path d="M30 6a10 10 0 0 0-9 14L6 35l7 7 15-15a10 10 0 0 0 14-9l-6 6-6-2-2-6z"/>',
  star: '<path d="m24 5 5.6 12 13 1.4-9.8 8.8 2.8 12.8L24 33.4 12.4 40l2.8-12.8L5.4 18.4l13-1.4z"/>'
};

window.TRADE_CATEGORIES = ['All', 'Structural', 'Licensed Services', 'Interior & Finishing', 'Outdoor', 'Specialist'];

window.TRADES = [
  {
    name: 'Carpentry & Joinery', cat: 'Structural', icon: 'hammer',
    summary: 'The framework of almost every build: structural framing, doors, stairs, architraves and custom timber work, both inside and out.',
    covers: ['Wall, roof and floor framing', 'Doors, frames, locks and hardware', 'Stairs, balustrades and handrails', 'Skirting, architraves and custom shelving'],
    standard: [
      ['Measured twice, cut once', 'Every opening and run is laser-measured so doors swing true and joins sit tight.'],
      ['Quality timber only', 'Seasoned, correctly graded timber selected for the job, never the cheapest offcut.'],
      ['Finish-ready work', 'Fixings concealed, joins filled and sanded, ready for paint or stain.']
    ]
  },
  {
    name: 'Bricklaying & Blocklaying', cat: 'Structural', icon: 'bricks',
    summary: 'New brick and block walls, extensions, feature walls, letterboxes and repairs to existing masonry.',
    covers: ['Extensions and new walls', 'Besser block and retaining walls', 'Feature and face brickwork', 'Repointing and crack repairs'],
    standard: [
      ['Level, plumb and true', 'Every course is string-lined and checked so walls stay straight for decades.'],
      ['Matched to your home', 'We source bricks and mortar colours that blend seamlessly with existing work.'],
      ['Clean, crisp joints', 'Joints ironed and brickwork cleaned down, with no mortar smears left behind.']
    ]
  },
  {
    name: 'Concreting', cat: 'Structural', icon: 'layers',
    summary: 'Slabs, footings, driveways, paths and decorative finishes, poured and finished to last.',
    covers: ['House and shed slabs', 'Footings and piers', 'Driveways and paths', 'Exposed aggregate and coloured finishes'],
    standard: [
      ['Proper preparation', 'Compacted base, correct reinforcement and formwork set to the right falls.'],
      ['Right mix, right day', 'Concrete strength specified for the use, and pours planned around Melbourne weather.'],
      ['Controlled curing', 'Control joints cut and slabs cured properly to minimise cracking.']
    ]
  },
  {
    name: 'Roofing & Guttering', cat: 'Structural', icon: 'roof',
    summary: 'Roof repairs, restorations, re-roofing and the gutters and downpipes that keep water away from your home.',
    covers: ['Tile and Colorbond roofing', 'Leak detection and repairs', 'Gutters, fascias and downpipes', 'Ridge capping and re-pointing'],
    standard: [
      ['Safety first', 'Edge protection and harness systems on every roof, every time.'],
      ['Find the real cause', 'We trace leaks to their source rather than patching the symptom.'],
      ['Weather-tight finish', 'Flashings and seals detailed properly so the roof stays dry for the long haul.']
    ]
  },
  {
    name: 'Demolition & Strip-Outs', cat: 'Structural', icon: 'demo',
    summary: 'Safe, tidy removal of walls, kitchens, bathrooms and commercial interiors ahead of new work.',
    covers: ['Internal wall removal', 'Kitchen and bathroom strip-outs', 'Commercial strip-outs', 'Rubbish removal and recycling'],
    standard: [
      ['Surveyed before we start', 'Services isolated and hazards such as asbestos identified before anything comes down.'],
      ['Protection in place', 'Floors, fixtures and neighbouring rooms protected from dust and damage.'],
      ['Responsible disposal', 'Waste sorted and recycled where possible, and the site left broom-clean.']
    ]
  },
  {
    name: 'Steel Fabrication & Welding', cat: 'Structural', icon: 'spark',
    summary: 'Custom steelwork, from structural beams and posts to gates, balustrades and brackets.',
    covers: ['Structural beams and posts', 'Gates and balustrades', 'Custom brackets and frames', 'On-site welding repairs'],
    standard: [
      ['Engineered where needed', 'Structural steel is installed to engineering specifications.'],
      ['Clean, strong welds', 'Welds ground and finished neatly, not just made to hold.'],
      ['Protected against rust', 'Galvanised or primed and painted so it lasts outdoors.']
    ]
  },
  {
    name: 'Electrical', cat: 'Licensed Services', icon: 'bolt',
    summary: 'Power, lighting and switchboard work carried out by licensed electricians, for homes and businesses.',
    covers: ['Lighting and power points', 'Switchboard upgrades', 'Safety switches and smoke alarms', 'Fault finding and rewiring'],
    standard: [
      ['Licensed electricians only', 'All electrical work is done by appropriately licensed electricians, never by unlicensed hands.'],
      ['Certified and compliant', 'Work is tested and the required safety certificate is issued on completion.'],
      ['Neat installs', 'Cables concealed and fittings aligned, so it looks as good as it works.']
    ]
  },
  {
    name: 'Plumbing & Drainage', cat: 'Licensed Services', icon: 'drop',
    summary: 'Water supply, drainage, hot water and bathroom plumbing by licensed plumbers.',
    covers: ['Taps, toilets and fixtures', 'Hot water systems', 'Blocked and broken drains', 'Bathroom and kitchen rough-ins'],
    standard: [
      ['Licensed plumbers', 'All plumbing is carried out by licensed and registered plumbers.'],
      ['Pressure-tested', 'Pipework is tested before walls close up, and a compliance certificate is provided where required.'],
      ['No mess left behind', 'Drop sheets down and wet areas cleaned up when we finish.']
    ]
  },
  {
    name: 'Gas Fitting', cat: 'Licensed Services', icon: 'flame',
    summary: 'Installation, repair and safety checks of gas appliances and pipework by licensed gasfitters.',
    covers: ['Cooktop and oven connections', 'Gas heater installs and servicing', 'Gas leak detection', 'New gas lines and BBQ points'],
    standard: [
      ['Licensed gasfitters', 'Gas work is only ever completed by licensed gasfitters.'],
      ['Leak and safety tested', 'Every connection is pressure and leak tested before sign-off.'],
      ['Documented compliance', 'Compliance paperwork provided so you have peace of mind.']
    ]
  },
  {
    name: 'Air Conditioning & Heating', cat: 'Licensed Services', icon: 'snow',
    summary: 'Split systems, ducted heating and cooling, and servicing, installed by licensed technicians.',
    covers: ['Split system installation', 'Ducted heating and cooling', 'Servicing and repairs', 'Ventilation and exhaust fans'],
    standard: [
      ['Licensed technicians', 'Refrigerant and electrical work handled by appropriately licensed technicians.'],
      ['Sized for your space', 'Systems are matched to room size and use, not oversold.'],
      ['Tidy, discreet installs', 'Pipe runs concealed or neatly ducted, with units mounted level and secure.']
    ]
  },
  {
    name: 'Locksmithing & Security', cat: 'Licensed Services', icon: 'key',
    summary: 'Locks, deadbolts, access control and security upgrades for homes, offices and shops.',
    covers: ['Lock and deadbolt installs', 'Re-keying and master key systems', 'Security doors and screens', 'Access control and CCTV'],
    standard: [
      ['Quality hardware', 'Reputable, Australian Standards-rated locks and hardware.'],
      ['Precision fitting', 'Locks fitted flush and aligned so they operate smoothly for years.'],
      ['Discreet and trusted', 'Licensed, trusted trades who respect your privacy and security.']
    ]
  },
  {
    name: 'Painting & Decorating', cat: 'Interior & Finishing', icon: 'roller',
    summary: 'High-grade interior and exterior painting, feature finishes and protective coatings.',
    covers: ['Interior walls, ceilings and trims', 'Exterior and weatherboard painting', 'Feature walls and colour advice', 'Timber staining and protective coatings'],
    standard: [
      ['Preparation is everything', 'Surfaces cleaned, filled, sanded and primed before a drop of top coat.'],
      ['Premium paints', 'Quality paint systems applied at the right coverage for a lasting finish.'],
      ['Razor-sharp lines', 'Crisp cut-ins, no drips, and furniture and floors fully protected.']
    ]
  },
  {
    name: 'Plastering & Rendering', cat: 'Interior & Finishing', icon: 'trowel',
    summary: 'Plasterboard installation, patching, cornices and external rendering for a flawless surface.',
    covers: ['Plasterboard walls and ceilings', 'Patching and crack repairs', 'Cornices and decorative mouldings', 'Acrylic and cement rendering'],
    standard: [
      ['Level 4 / 5 finishes', 'Joints set and sanded to a smooth, paint-ready finish with no visible seams.'],
      ['Seamless repairs', 'Patches blended so they disappear once painted.'],
      ['Dust controlled', 'Rooms sealed off and cleaned so the dust leaves with us.']
    ]
  },
  {
    name: 'Tiling & Waterproofing', cat: 'Interior & Finishing', icon: 'tiles',
    summary: 'Wall and floor tiling for bathrooms, kitchens, laundries and outdoor areas, with compliant waterproofing.',
    covers: ['Bathroom and shower tiling', 'Kitchen splashbacks', 'Floor and outdoor tiling', 'Membrane waterproofing'],
    standard: [
      ['Waterproofing done right', 'Membranes applied to the relevant standard before tiling, the step others rush.'],
      ['Perfect setout', 'Tiles laid out from the centre so cuts are balanced and grout lines straight.'],
      ['Correct falls', 'Floors graded so water runs to the waste, every time.']
    ]
  },
  {
    name: 'Flooring & Floor Sanding', cat: 'Interior & Finishing', icon: 'layers',
    summary: 'Timber, hybrid, laminate and vinyl flooring, plus sanding and polishing of existing timber floors.',
    covers: ['Timber and engineered floors', 'Hybrid, laminate and vinyl', 'Sanding and polishing', 'Floor levelling and subfloor repairs'],
    standard: [
      ['Flat, sound subfloors', 'Subfloors levelled and secured first, so new floors don’t squeak or lift.'],
      ['Expansion allowed for', 'Correct gaps and acclimatisation so floors stay flat through every season.'],
      ['Flawless transitions', 'Neat trims and thresholds between rooms and surfaces.']
    ]
  },
  {
    name: 'Cabinet Making & Kitchens', cat: 'Interior & Finishing', icon: 'cabinet',
    summary: 'Custom kitchens, vanities, wardrobes and built-in joinery made to fit your space.',
    covers: ['Kitchen design and installation', 'Vanities and laundries', 'Built-in robes and storage', 'Benchtop installation'],
    standard: [
      ['Made to measure', 'Every cabinet built to your exact measurements, not squeezed in.'],
      ['Quality hardware', 'Soft-close hinges and runners from trusted brands as standard.'],
      ['Aligned to the millimetre', 'Doors and drawers adjusted so gaps are even and everything closes perfectly.']
    ]
  },
  {
    name: 'Glazing & Windows', cat: 'Interior & Finishing', icon: 'window',
    summary: 'Window and door glazing, glass replacement, shower screens, mirrors and splashbacks.',
    covers: ['Broken glass replacement', 'Window and door installation', 'Shower screens and mirrors', 'Double glazing upgrades'],
    standard: [
      ['Safety glass where required', 'Correct glass grades used in wet areas, doors and low windows.'],
      ['Sealed tight', 'Frames sealed against draughts and water ingress.'],
      ['Smooth operation', 'Sashes and sliders adjusted so they open and lock with ease.']
    ]
  },
  {
    name: 'Insulation', cat: 'Interior & Finishing', icon: 'layers',
    summary: 'Ceiling, wall and underfloor insulation to keep your home comfortable and lower energy bills.',
    covers: ['Ceiling batts', 'Wall insulation', 'Underfloor insulation', 'Acoustic insulation'],
    standard: [
      ['Correct R-values', 'Product rated for Melbourne’s climate and the area being insulated.'],
      ['Full, gap-free coverage', 'Batts fitted snugly with no gaps, while keeping safe clearances from downlights and flues.'],
      ['Clean roof space', 'Old debris removed and access points left tidy.']
    ]
  },
  {
    name: 'Handyman & Maintenance', cat: 'Interior & Finishing', icon: 'wrench',
    summary: 'The odd jobs list sorted in one visit, from small repairs to ongoing property maintenance.',
    covers: ['General repairs and odd jobs', 'Furniture and fixture assembly', 'Rental and end-of-lease repairs', 'Ongoing property maintenance'],
    standard: [
      ['One visit, whole list', 'We plan the visit so your full to-do list gets done properly.'],
      ['Right trade for the task', 'If a job needs a licence, a licensed tradesperson does it.'],
      ['Small job, same standard', 'Every repair gets the same care as a full renovation.']
    ]
  },
  {
    name: 'Decking & Pergolas', cat: 'Outdoor', icon: 'deck',
    summary: 'Timber and composite decks, pergolas, verandahs and outdoor living spaces.',
    covers: ['Timber and composite decking', 'Pergolas and verandahs', 'Deck restoration and oiling', 'Outdoor entertaining areas'],
    standard: [
      ['Built on solid footings', 'Stumps and bearers sized and set to stay level for years.'],
      ['Weather-ready materials', 'Treated timber, stainless fixings and hardware made for the outdoors.'],
      ['Beautifully finished', 'Even board spacing, hidden fixings where possible and quality oils.']
    ]
  },
  {
    name: 'Fencing & Gates', cat: 'Outdoor', icon: 'fence',
    summary: 'Timber, Colorbond, picket and pool fencing, plus custom and automated gates.',
    covers: ['Timber paling and picket fences', 'Colorbond fencing', 'Pool fencing', 'Gates and gate automation'],
    standard: [
      ['Straight and strong', 'Posts concreted to depth and string-lined for a dead-straight run.'],
      ['Compliant pool fencing', 'Pool barriers built to the relevant safety standard.'],
      ['Gates that swing true', 'Heavy-duty hinges and latches adjusted so gates never drag.']
    ]
  },
  {
    name: 'Landscaping & Retaining Walls', cat: 'Outdoor', icon: 'leaf',
    summary: 'Retaining walls, garden beds, turf, irrigation and complete outdoor makeovers.',
    covers: ['Timber, sleeper and block retaining walls', 'Garden beds and planting', 'Turf and irrigation', 'Drainage and site levelling'],
    standard: [
      ['Drainage designed in', 'Ag pipe and gravel behind every retaining wall so it stays put.'],
      ['Built for the load', 'Walls engineered where required for height and soil conditions.'],
      ['Ready to enjoy', 'Site cleaned, levelled and finished so it looks great on day one.']
    ]
  },
  {
    name: 'Paving', cat: 'Outdoor', icon: 'tiles',
    summary: 'Pavers, natural stone and outdoor tiles for patios, paths, driveways and pool surrounds.',
    covers: ['Patios and courtyards', 'Paths and driveways', 'Pool surrounds', 'Natural stone and bluestone'],
    standard: [
      ['Compacted base', 'Proper excavation and compacted base so pavers don’t sink or shift.'],
      ['Correct falls', 'Surfaces graded to shed water away from your home.'],
      ['Clean cuts and edges', 'Precise cuts around edges and pits, and edges locked in place.']
    ]
  },
  {
    name: 'Stonemasonry', cat: 'Specialist', icon: 'bricks',
    summary: 'Natural stone walls, cladding, steps and restoration, a craft trade we take seriously.',
    covers: ['Stone walls and cladding', 'Stone steps and features', 'Bluestone work', 'Stone restoration and repointing'],
    standard: [
      ['Craftsmanship first', 'Experienced masons who select and dress each stone by hand.'],
      ['Built to last generations', 'Proper foundations and mortars matched to the stone.'],
      ['Natural, balanced look', 'Stone laid for colour and pattern balance across the whole face.']
    ]
  },
  {
    name: 'Heritage Restoration', cat: 'Specialist', icon: 'house',
    summary: 'Sympathetic repairs to period homes: Victorian, Edwardian and Federation detailing restored properly.',
    covers: ['Period fretwork and verandahs', 'Ornate plaster and cornice repair', 'Timber window restoration', 'Lime mortar repointing'],
    standard: [
      ['Respect for the original', 'Traditional materials and methods used wherever possible.'],
      ['Matched details', 'Mouldings and profiles replicated to match existing features.'],
      ['Heritage-aware', 'We work within heritage overlay requirements and help with paperwork.']
    ]
  },
  {
    name: 'Commercial Fit-Outs', cat: 'Specialist', icon: 'office',
    summary: 'Offices, retail and hospitality spaces fitted out end-to-end, with every trade coordinated by one team.',
    covers: ['Partitions and suspended ceilings', 'Office and retail layouts', 'Shopfronts and counters', 'After-hours works to minimise disruption'],
    standard: [
      ['One coordinated team', 'Every trade scheduled and managed by us, with a single point of contact.'],
      ['On time, minimal disruption', 'Staged and after-hours work so your business keeps trading.'],
      ['Compliance handled', 'Certificates and sign-offs gathered for a smooth handover.']
    ]
  },
  {
    name: 'Other Specialist & Niche Trades', cat: 'Specialist', icon: 'star', other: true,
    summary: 'Can’t see your trade? We cover the specialist, unusual and hard-to-find trades too, each carried out by a licensed and insured professional.',
    covers: ['Specialist coatings and epoxy floors', 'Acoustic treatments and soundproofing', 'Signage, shopfittings and displays', 'Anything else: just ask'],
    standard: [
      ['The right licence, every time', 'We match your job with a tradesperson holding the exact licence it needs.'],
      ['One point of contact', 'However unusual the trade, you deal with Stonebridge from quote to handover.'],
      ['Same quality standard', 'Niche or everyday, every job is held to the Stonebridge standard.']
    ]
  }
];
