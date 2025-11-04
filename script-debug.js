// script.js - DEBUG VERSION
document.addEventListener('DOMContentLoaded', () => {
  console.log('MyProtection App initializing...');
  
  // Debug: Check if elements exist
  const elements = {
    startBtn: document.getElementById('startBtn'),
    formSection: document.getElementById('formSection'),
    calcBtn: document.getElementById('calcBtn'),
    resetBtn: document.getElementById('resetBtn'),
    resultSection: document.getElementById('resultSection'),
    resultBox: document.getElementById('resultBox'),
    sendBtn: document.getElementById('sendBtn'),
    bookBtn: document.getElementById('bookBtn'),
    emailSection: document.getElementById('emailSection'),
    emailForm: document.getElementById('emailForm'),
    protectionForm: document.getElementById('protectionForm')
  };

  // Log element existence
  console.log('Element check:', elements);
  Object.entries(elements).forEach(([key, element]) => {
    if (element) {
      console.log(`✓ ${key} found`);
    } else {
      console.log(`✗ ${key} NOT FOUND`);
    }
  });

  // Navigation functions
  const scrollToSection = (sectionId) => {
    console.log(`Scrolling to: ${sectionId}`);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } else {
      console.error(`Section ${sectionId} not found`);
    }
  };

  // Show/hide sections
  const showSection = (sectionId) => {
    console.log(`Showing section: ${sectionId}`);
    const sections = ['formSection', 'resultSection', 'emailSection'];
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        if (id === sectionId) {
          section.style.display = 'block';
          console.log(`✓ Showing ${id}`);
        } else {
          section.style.display = 'none';
          console.log(`✓ Hiding ${id}`);
        }
      } else {
        console.error(`Section ${id} not found`);
      }
    });
  };

  // Initialize: Hide all sections except hero
  showSection('');
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate exposure
  const calculateExposure = (formData) => {
    const homeValue = parseFloat(formData.homeValue) || 0;
    const vehicleValue = parseFloat(formData.vehicleValue) || 0;
    const savingsValue = parseFloat(formData.savingsValue) || 0;
    const incomeValue = parseFloat(formData.incomeValue) || 0;
    
    // Total exposure = home + vehicle + savings + (income × 1 year)
    const totalExposure = homeValue + vehicleValue + savingsValue + incomeValue;
    console.log('Exposure calculation:', { homeValue, vehicleValue, savingsValue, incomeValue, totalExposure });
    return totalExposure;
  };

  // Get recommendation based on exposure
  const getRecommendation = (exposure) => {
    console.log(`Getting recommendation for exposure: ${formatCurrency(exposure)}`);
    let recommendation;
    
    if (exposure <= 60000) {
      recommendation = {
        coverage: '30/60',
        gap: 'insufficient',
        message: 'You may need higher coverage to protect your assets'
      };
    } else if (exposure <= 100000) {
      recommendation = {
        coverage: '50/100',
        gap: 'insufficient',
        message: 'Consider increasing your liability coverage'
      };
    } else if (exposure <= 300000) {
      recommendation = {
        coverage: '100/300',
        gap: 'adequate',
        message: 'Your current coverage may be adequate'
      };
    } else if (exposure <= 500000) {
      recommendation = {
        coverage: '500/500',
        gap: 'adequate',
        message: 'Higher limits recommended for better protection'
      };
    } else {
      recommendation = {
        coverage: '500/500 + $1M Umbrella',
        gap: 'excellent',
        message: 'Excellent coverage for high-value assets'
      };
    }
    
    console.log('Recommendation:', recommendation);
    return recommendation;
  };

  // Calculate gap analysis
  const analyzeGap = (currentCoverage, recommended) => {
    const currentLimits = {
      'Not sure': 50000, // Assume minimum
      '25/50': 25000,
      '30/60': 30000,
      '50/100': 50000,
      '100/300': 100000,
      '250/500': 250000,
      '500/500': 500000,
      '500/1000': 500000
    };

    const currentLimit = currentLimits[currentCoverage] || 50000;
    const recommendedLimit = recommended === '500/500 + $1M Umbrella' ? 1000000 : 
                           parseInt(recommended.split('/')[1]);

    let gapAnalysis;
    if (currentLimit < recommendedLimit) {
      gapAnalysis = 'Insufficient coverage';
    } else if (currentLimit === recommendedLimit) {
      gapAnalysis = 'Good match';
    } else {
      gapAnalysis = 'Well covered';
    }
    
    console.log('Gap analysis:', { currentCoverage, recommended, currentLimit, recommendedLimit, gapAnalysis });
    return gapAnalysis;
  };

  // Display results
  const displayResults = (exposure, recommendation, gapAnalysis) => {
    console.log('Displaying results:', { exposure, recommendation, gapAnalysis });
    
    const exposureAmount = document.getElementById('exposureAmount');
    const recommendationElement = document.getElementById('recommendation');
    const gapElement = document.getElementById('gapAnalysis');
    
    if (exposureAmount) {
      exposureAmount.textContent = formatCurrency(exposure);
      console.log('✓ Exposure amount updated');
    } else {
      console.error('✗ exposureAmount element not found');
    }
    
    if (recommendationElement) {
      recommendationElement.textContent = recommendation.coverage;
      console.log('✓ Recommendation updated');
    } else {
      console.error('✗ recommendation element not found');
    }
    
    if (gapElement) {
      gapElement.textContent = gapAnalysis;
      gapElement.className = `gap ${recommendation.gap}`;
      console.log('✓ Gap analysis updated');
    } else {
      console.error('✗ gapAnalysis element not found');
    }
  };

  // Event listeners with error handling
  if (elements.startBtn) {
    elements.startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('✓ Start button clicked');
      showSection('formSection');
      scrollToSection('formSection');
    });
    console.log('✓ Start button event listener added');
  } else {
    console.error('✗ Start button not found');
  }

  if (elements.protectionForm) {
    elements.protectionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('✓ Form submitted');
      
      const formData = new FormData(elements.protectionForm);
      const data = Object.fromEntries(formData);
      console.log('Form data:', data);
      
      // Calculate exposure
      const exposure = calculateExposure(data);
      
      // Get recommendation
      const recommendation = getRecommendation(exposure);
      
      // Analyze gap
      const gapAnalysis = analyzeGap(data.currentCoverage, recommendation.coverage);
      
      // Display results
      displayResults(exposure, recommendation, gapAnalysis);
      
      // Show result section
      showSection('resultSection');
      scrollToSection('resultSection');
      
      // Store data for email
      window.myProtectionData = {
        ...data,
        exposure,
        recommendation: recommendation.coverage,
        gapAnalysis,
        message: recommendation.message
      };
      console.log('✓ Data stored for email');
    });
    console.log('✓ Protection form event listener added');
  } else {
    console.error('✗ Protection form not found');
  }

  // Email functionality
  if (elements.sendBtn) {
    elements.sendBtn.addEventListener('click', () => {
      console.log('✓ Send button clicked');
      showSection('emailSection');
      scrollToSection('emailSection');
    });
    console.log('✓ Send button event listener added');
  } else {
    console.error('✗ Send button not found');
  }

  if (elements.emailForm) {
    elements.emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('✓ Email form submitted');
      
      const emailData = new FormData(elements.emailForm);
      const userInfo = Object.fromEntries(emailData);
      console.log('Email data:', userInfo);
      
      if (window.myProtectionData) {
        const data = window.myProtectionData;
        
        // Create email content
        const subject = `MyProtection Number Results - ${userInfo.userName}`;
        const body = `
MyProtection Number Results

Name: ${userInfo.userName}
Email: ${userInfo.userEmail}

ASSET INFORMATION:
- Home Value: ${formatCurrency(data.homeValue)}
- Vehicle Value: ${formatCurrency(data.vehicleValue)}  
- Savings & Investments: ${formatCurrency(data.savingsValue)}
- Annual Household Income: ${formatCurrency(data.incomeValue)}
- Life Insurance: ${formatCurrency(data.lifeInsurance)}
- Current Auto Coverage: ${data.currentCoverage}

RESULTS:
- Total Protection Exposure: ${formatCurrency(data.exposure)}
- Recommended Coverage: ${data.recommendation}
- Gap Analysis: ${data.gapAnalysis}

Next Steps: ${data.message}

This analysis was generated by the MyProtection educational tool.
This is not a quote, offer, or guarantee of coverage.

Best regards,
${userInfo.userName}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:Tre.Scott@countryfinancial.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        console.log('Mailto link created:', mailtoLink);
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset forms and show success message
        setTimeout(() => {
          alert('Your email client should now open with your results pre-filled. If it doesn\'t open automatically, please copy your results and email them to Tre.Scott@countryfinancial.com');
          elements.protectionForm.reset();
          elements.emailForm.reset();
          showSection('formSection');
        }, 1000);
      } else {
        console.error('No protection data found for email');
        alert('Please calculate your MyProtection Number first.');
      }
    });
    console.log('✓ Email form event listener added');
  } else {
    console.error('✗ Email form not found');
  }

  // Book appointment
  if (elements.bookBtn) {
    elements.bookBtn.addEventListener('click', () => {
      console.log('✓ Book appointment button clicked');
      window.open('https://outlook.office365.com/book/TreScottAgencyCOUNTRYFinancial@countryfinancial.com/?RefID=rep_bio&ismsaljsauthenabled=true', '_blank');
    });
    console.log('✓ Book button event listener added');
  } else {
    console.error('✗ Book button not found');
  }

  // Reset functionality
  if (elements.resetBtn) {
    elements.resetBtn.addEventListener('click', () => {
      console.log('✓ Reset button clicked');
      elements.protectionForm.reset();
      showSection('formSection');
      scrollToSection('formSection');
    });
    console.log('✓ Reset button event listener added');
  } else {
    console.log('ℹ Reset button not found (optional)');
  }

  // Form validation
  const validateForm = () => {
    if (!elements.protectionForm) {
      console.error('Protection form not found for validation');
      return false;
    }
    
    const requiredFields = elements.protectionForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value || field.value === '') {
        field.style.borderColor = '#ff4444';
        field.style.borderWidth = '2px';
        isValid = false;
        console.log(`✗ Invalid field: ${field.id || field.name}`);
      } else {
        field.style.borderColor = 'var(--border)';
        field.style.borderWidth = '2px';
      }
    });
    
    console.log('Form validation:', isValid);
    return isValid;
  };

  // Add validation to calc button
  if (elements.calcBtn) {
    elements.calcBtn.addEventListener('click', (e) => {
      console.log('✓ Calculate button clicked');
      if (!validateForm()) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
    console.log('✓ Calculate button validation added');
  } else {
    console.error('✗ Calculate button not found');
  }

  console.log('🎉 MyProtection App initialization complete!');
  console.log('Check console for element verification and debugging info.');
});