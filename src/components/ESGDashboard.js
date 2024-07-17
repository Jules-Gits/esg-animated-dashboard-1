import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import icons from '../assets/icons';

const iconMap = {
  'Data protection / cyber-security': 'Data-protection',
  'Honest / transparent accounting practices': 'Transparent-accounting',
  'Fair pricing (companies fairly pricing their products or services)': 'Fair-pricing',
  'Degree to which business growth looks sustainable over the long term': 'Sustainable-growth',
  'Supporting the humane treatment of animals': 'Animal-treatment',
  'Supporting the conservation of oceans and marine life': 'Marine-life',
  'Avoiding water waste': 'Water-waste',
  'High regard for staff health / safety': 'Health-safety',
  'Fair treatment of and remuneration for company employees': 'Fair-remuneration',
  'Supporting cuts to pollution / carbon emissions': 'Cut-pollution',
  "A company's ethical values": 'Ethical-value',
  'Supporting the preservation of natural capital (e.g. biodiversity eliminating waste etc.)': 'Natural-capital',
  'Supporting action against climate change (e.g. company carbon footprint)': 'Climate-change',
  'Supporting the combat against global poverty': 'Global-poverty',
  'Supporting healthy lives and well-being for all people': 'Well-being',
  'Do not engage in morally questionable business (e.g. nicotine alcohol gambling pornography)': 'Questionable-business',
  'Supporting the local community / local infrastructure': 'Infrastructure',
  'Supporting access to quality education': 'Education',
  'Shareholder voting rights': 'Shareholder-voting',
  'Clean transportation (i.e. EV batteries shared mobility freight)': 'Clean-transportation',
  'Supporting diversity and inclusion (e.g. employment policies gender equality agenda etc.)': 'Diversity-inclusion',
  "A company's partnership / supplier organisations": 'Partnership',
  'Profits / donations given to charity': 'Charity-donation'
};

const regionAbbreviations = {
  'Global': 'Global',
  'Europe': 'EU',
  'Asia': 'Asia',
  'UK': 'UK',
  'Belgium': 'BEL',
  'Germany': 'GER',
  'Spain': 'SP',
  'France': 'FR',
  'Italy': 'IT',
  'Hong Kong': 'HK',
  'Japan': 'JP',
  'Philippines': 'PH',
  'Singapore': 'SG',
  'Thailand': 'TH',
  'Indonesia': 'ID'
};

const getCategoryColor = (category, isHovered = false) => {
  const colors = {
    'E': ['#9fd9b4', '#7ac092'], // Normal, Hover
    'S': ['#027180', '#015868'],
    'G': ['#00adc6', '#0089a3'],
    'default': ['gray', 'darkgray']
  };
  return colors[category] ? colors[category][isHovered ? 1 : 0] : colors['default'][isHovered ? 1 : 0];
};

const ESGDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllFactors, setShowAllFactors] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [labelPositions, setLabelPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating data fetch - replace this with actual data fetching logic
      const csvData = `Column %,E S or G,Global,Europe,Asia,UK,Belgium,Germany,Spain,France,Italy,Hong Kong,Japan,Philippines,Singapore,Thailand,Indonesia
Data protection / cyber-security,G,81.49,78.48,84.50,79.40,73.90,78.80,80.20,76.30,82.30,83.50,61.30,95.50,80.30,93.60,92.80
Fair pricing (companies fairly pricing their products or services),G,76.38,74.65,78.10,77.20,70.40,74.80,73.30,71.30,80.90,74.00,55.00,92.70,75.90,88.90,82.10
Honest / transparent accounting practices,G,81.38,78.40,84.35,78.20,77.50,74.70,78.70,76.50,84.80,84.00,61.50,95.60,80.50,93.00,91.50
Supporting the conservation of oceans and marine life,E,72.38,72.72,72.05,70.70,68.60,72.60,72.00,71.80,80.60,68.20,44.40,88.60,67.10,84.80,79.20
Avoiding water waste,E,72.83,72.10,73.55,66.40,67.60,70.70,75.30,76.00,76.60,70.00,43.30,90.40,70.80,84.90,81.90
High regard for staff health / safety,G,72.92,70.95,74.88,69.60,66.70,70.10,71.60,68.90,78.80,70.30,43.80,93.10,70.10,88.50,83.50
Fair treatment of and remuneration for company employees,G,71.84,69.80,73.88,69.10,66.90,69.30,72.10,65.60,75.80,67.60,48.40,91.40,66.00,89.30,80.60
Supporting the humane treatment of animals,E,68.66,68.08,69.23,68.00,65.00,66.10,66.40,68.20,74.80,63.80,37.00,87.40,64.40,86.30,76.50
Supporting cuts to pollution / carbon emissions,E,72.11,69.25,74.97,67.30,62.50,66.00,70.60,68.50,80.60,73.80,43.50,88.90,69.20,89.50,84.90
Degree to which business growth looks sustainable over the long term,G,74.93,70.42,79.45,72.70,64.50,65.70,72.40,69.00,78.20,79.70,55.70,89.70,71.80,92.60,87.20
A company's ethical values,S,71.33,66.55,76.12,69.90,59.40,65.20,71.40,57.50,75.90,72.00,51.20,89.90,70.70,86.60,86.30
Supporting the preservation of natural capital (e.g. biodiversity eliminating waste etc.),E,70.48,68.17,72.80,63.20,65.00,64.90,69.30,70.00,76.60,66.10,43.40,89.10,67.20,85.20,85.80
Supporting action against climate change (e.g. company carbon footprint),E,68.78,65.60,71.97,63.00,56.20,61.50,69.50,66.40,77.00,68.70,41.70,88.00,69.40,83.10,80.90
Supporting the combat against global poverty,S,66.01,64.30,67.72,59.40,57.80,60.70,67.70,61.50,78.70,56.50,34.50,86.30,64.10,82.50,82.40
Supporting healthy lives and well-being for all people,S,72.04,68.67,75.42,67.40,67.90,60.40,70.80,68.90,76.60,68.20,44.20,91.70,71.60,89.70,87.10
Do not engage in morally questionable business (e.g. nicotine alcohol gambling pornography),S,66.59,63.73,69.45,62.60,59.50,59.50,66.80,60.40,73.60,65.60,44.20,80.40,65.60,79.40,81.50
Supporting the local community / local infrastructure,S,65.98,63.78,68.17,59.90,56.60,58.90,68.30,62.60,76.40,62.50,32.40,85.20,64.20,85.90,78.80
Supporting access to quality education,S,68.58,65.43,71.73,60.30,61.30,57.70,71.70,66.30,75.30,61.00,37.90,90.60,65.10,88.20,87.60
Shareholder voting rights,G,63.97,58.73,69.20,58.30,52.80,56.30,62.80,56.50,65.70,62.30,37.40,85.90,64.10,86.70,78.80
Clean transportation (i.e. EV batteries shared mobility freight),E,63.71,58.83,68.58,54.60,50.60,55.60,62.40,56.20,73.60,62.60,39.10,86.70,63.80,85.10,74.20
Supporting diversity and inclusion (e.g. employment policies gender equality agenda etc.),S,62.16,57.97,66.35,57.50,51.80,53.70,60.90,54.50,69.40,59.90,38.50,83.80,61.70,81.10,73.10
A company's partnership / supplier organisations,G,63.59,57.58,69.60,58.70,53.90,52.90,59.30,58.10,62.60,67.90,36.30,86.40,65.30,83.30,78.40
Profits / donations given to charity,S,54.72,51.03,58.40,50.40,46.40,46.50,55.50,49.80,57.60,48.40,24.10,76.30,53.90,75.90,71.80`;

      const lines = csvData.split('\n');
      const headers = lines[0].split(',');
      const parsedData = {};

      headers.slice(2).forEach(region => {
        parsedData[region] = [];
      });

      lines.slice(1).forEach(line => {
        const values = line.split(',');
        headers.slice(2).forEach((region, index) => {
          parsedData[region].push({
            name: values[0],
            category: values[1],
            value: parseFloat(values[index + 2])
          });
        });
      });

      setData(parsedData);
    };

    fetchData();
  }, []);

  const regions = data ? Object.keys(data) : [];
  const sliderRef = useRef(null);
  const labelsContainerRef = useRef(null);

  useEffect(() => {
    const calculateLabelPositions = () => {
      if (sliderRef.current && labelsContainerRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const labelsContainerRect = labelsContainerRef.current.getBoundingClientRect();
        const thumbWidth = 20; // Approximate width of the slider thumb
        const availableWidth = sliderRect.width - thumbWidth;
        const startOffset = thumbWidth / 2;
        
        const positions = regions.map((_, index) => {
          const percentage = index / (regions.length - 1);
          return startOffset + percentage * availableWidth;
        });
        
        setLabelPositions(positions);
      }
    };

    calculateLabelPositions();
    window.addEventListener('resize', calculateLabelPositions);
    return () => window.removeEventListener('resize', calculateLabelPositions);
  }, [regions]);

  useEffect(() => {
    if (regions.length > 0) {
      setSelectedRegion(regions[sliderValue]);
    }
  }, [sliderValue, regions]);

  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
  };

  const filteredData = data && data[selectedRegion]
    ? data[selectedRegion]
        .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
        .sort((a, b) => b.value - a.value)
    : [];

  const displayedData = showAllFactors ? filteredData : filteredData.slice(0, 10);

  const categories = [
    { name: 'All', color: '#718096', hoverColor: '#4a5568' }, // Changed color to a lighter gray
    { name: 'E', color: '#9fd9b4', hoverColor: '#7ac092' },
    { name: 'S', color: '#027180', hoverColor: '#015868' },
    { name: 'G', color: '#00adc6', hoverColor: '#0089a3' },
  ];

  const handleMouseEnter = useCallback((e, category) => {
    e.target.style.backgroundColor = category.hoverColor;
    e.target.style.color = category.name === 'E' ? 'black' : 'white';
  }, []);

  const handleMouseLeave = useCallback((e, category) => {
    if (category.name !== selectedCategory) {
      e.target.style.backgroundColor = '#e2e8f0';
      e.target.style.color = 'black';
    } else {
      e.target.style.backgroundColor = category.color;
      e.target.style.color = category.name === 'E' ? 'black' : 'white';
    }
  }, [selectedCategory]);

  const barHeight = 35; // Set your desired bar height here (in pixels)
  const hoverBarHeight = 55; // Set your desired hover bar height here (in pixels)
  const iconSize = 25; // Set your desired icon size here (in pixels)
  const hoverIconSize = 38; // Set your desired hover icon size here (in pixels)

  const labelRef = useRef(null);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/*<h1 className="text-2xl mb-4 font-custom">ESG Criteria Rankings Dashboard</h1>*/}
      
      <div className="flex justify-between items-center mb-8">
      <div className="flex items-center">
          <h2 className="text-xl font-semibold">{selectedRegion}</h2>
          {!showAllFactors && (
            <h2 className="ml-1 text-xl">(Top 10)</h2>
          )}
        </div>
        <div className="flex space-x-2">
        <button 
          onClick={() => setShowAllFactors(!showAllFactors)}
          className="px-4 py-2 bg-cobalt-light text-white hover:text-white hover:bg-cobalt-hover transition-colors"
      >
          {showAllFactors ? "Show Top 10 Factors" : "Show All Factors"}
        </button>
          {categories.map(cat => (
            <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1 transition-colors duration-200 ease-in-out`}
            style={{ 
              backgroundColor: selectedCategory === cat.name ? cat.color : '#e2e8f0',
              color: selectedCategory === cat.name 
                ? (cat.name === 'E' ? 'black' : 'white')
                : 'black',
            }}
            onMouseEnter={(e) => handleMouseEnter(e, cat)}
            onMouseLeave={(e) => handleMouseLeave(e, cat)}
          >
            {cat.name}
          </button>
          ))}
        </div>
      </div>

      <div 
        className="relative overflow-hidden" 
        style={{ 
          height: `${displayedData.length * (barHeight + 4.5)}px`,
          transition: 'height 0.5s ease-in-out' 
        }}
      >
        <AnimatePresence initial={false}>
          {displayedData.map((item, index) => {
            const iconKey = iconMap[item.name] || 'Data-protection';
            const IconComponent = icons[iconKey];
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: index * (barHeight + 3) }}
                animate={{ 
                  opacity: 1, 
                  y: index * (barHeight + 3) + (hoveredIndex !== null && index > hoveredIndex ? (hoverBarHeight - barHeight) : 0),
                  zIndex: hoveredIndex === index ? 10 : 1,
                }}
                exit={{ 
                  opacity: 0, 
                  y: (index + 1) * (barHeight + 4),
                  transition: { duration: 0.3 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-full mb-1"
                style={{ height: `${barHeight}px` }}
              >
                <motion.div 
                  className="h-full flex items-center justify-between relative px-2 transition-all duration-300 ease-in-out"
                  style={{ 
                    width: `${Math.max(item.value, 15)}%`, 
                    backgroundColor: getCategoryColor(item.category),
                    minWidth: '300px',
                    transformOrigin: 'center left',
                  }}
                  whileHover={{
                    backgroundColor: getCategoryColor(item.category, true),
                    scaleY: 1.04,
                    height: `${hoverBarHeight}px`,
                    transition: { duration: 0.1 }
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center space-x-2 overflow-hidden" style={{maxWidth: 'calc(100% - 70px)'}}>
                    {IconComponent && (
                      <motion.div 
                        className="flex-shrink-0 transition-all duration-200 ease-in-out"
                        style={{ 
                          width: `${iconSize}px`, 
                          height: `${iconSize}px` 
                        }}
                        animate={{
                          width: hoveredIndex === index ? `${hoverIconSize}px` : `${iconSize}px`,
                          height: hoveredIndex === index ? `${hoverIconSize}px` : `${iconSize}px`,
                        }}
                      >
                        <IconComponent className="w-full h-full text-white" />
                      </motion.div>
                    )}
                    <motion.span 
                      ref={labelRef}
                      className="text-sm text-white text-shadow whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out flex-grow"
                      style={{ 
                        fontSize: hoveredIndex === index ? '16px' : '14px',
                      }}
                    >
                      {item.name}
                    </motion.span>
                  </div>
                  <motion.span 
                    className="text-sm font-custom text-white text-shadow ml-2 flex-shrink-0 transition-all duration-200 ease-in-out"
                    style={{ fontSize: hoveredIndex === index ? '20px' : '16px' }}
                  >
                    {item.value.toFixed(1)}%
                  </motion.span>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      
      {/* Region Slider */}
      <div className="mt-4">
                {/* Flag icons
                <div className="flex justify-between mb-2">
          {regions.map(region => {
            const FlagIcon = icons[region] || icons['Global']; // Fallback to Global if icon not found
            return (
              <div key={region} className="w-6 h-6">
                <FlagIcon className="w-full h-full" />
              </div>
            );
          })}
        </div> */}

        {/* Slider */}
        <div className="mt-2">
          <div className="w-full relative" ref={sliderRef}>
            <input
              type="range"
              min="0"
              max={regions.length - 1}
              step="1"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cobalt-light"
            />
            
            {/* Precisely Aligned Region labels */}
            <div className="absolute w-full top-8 left-0 right-0" ref={labelsContainerRef}>
              {regions.map((region, index) => (
                <span 
                  key={region} 
                  className={`absolute text-xs transform -translate-x-1/2 ${
                    index === sliderValue ? 'font-bold text-cobalt-light' : ''
                  }`}
                  style={{ left: `${labelPositions[index]}px` }}
                >
                  {regionAbbreviations[region] || region}
                </span>
              ))}
            </div>
          </div>
        </div>
       </div> 
      {/* <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Key Insights for {selectedRegion}</h2>
        <ul className="list-disc pl-5">
          <li>Top factor: {filteredData[0]?.name} ({filteredData[0]?.value.toFixed(2)}%)</li>
          <li>
            {showAllFactors 
              ? `Lowest factor: ${filteredData[filteredData.length - 1]?.name} (${filteredData[filteredData.length - 1]?.value.toFixed(2)}%)`
              : `10th factor: ${filteredData[9]?.name} (${filteredData[9]?.value.toFixed(2)}%)`
            }
          </li>
          <li>{filteredData.filter(item => item.category === 'E').length} Environmental factors in {showAllFactors ? 'total' : 'top 10'}</li>
          <li>{filteredData.filter(item => item.category === 'S').length} Social factors in {showAllFactors ? 'total' : 'top 10'}</li>
          <li>{filteredData.filter(item => item.category === 'G').length} Governance factors in {showAllFactors ? 'total' : 'top 10'}</li>
        </ul>
      </div> */}
    </div>
  );
};

export default ESGDashboard;