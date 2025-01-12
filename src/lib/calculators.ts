interface MortgageParams {
  propertyPrice: number;
  deposit: number;
  interestRate: number;
  term: number;
}

interface BTLParams extends MortgageParams {
  monthlyRent: number;
  managementFee?: number;
  maintenanceCost?: number;
  insuranceCost?: number;
  voidPeriods?: number;
}

interface SAParams extends BTLParams {
  nightlyRate: number;
  occupancyRate: number;
  cleaningCost: number;
  platformFees: number;
}

export function calculateMortgage({
  propertyPrice,
  deposit,
  interestRate,
  term
}: MortgageParams) {
  const loanAmount = propertyPrice - deposit;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = term * 12;

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return {
    monthlyPayment,
    totalPayable: monthlyPayment * numberOfPayments,
    totalInterest: (monthlyPayment * numberOfPayments) - loanAmount
  };
}

export function calculateBTLReturns({
  propertyPrice,
  deposit,
  interestRate,
  term,
  monthlyRent,
  managementFee = 10,
  maintenanceCost = 1,
  insuranceCost = 30,
  voidPeriods = 4
}: BTLParams) {
  const mortgage = calculateMortgage({ propertyPrice, deposit, interestRate, term });
  
  // Annual calculations
  const annualRent = monthlyRent * (12 - voidPeriods);
  const annualManagementFee = (managementFee / 100) * annualRent;
  const annualMaintenance = (maintenanceCost / 100) * propertyPrice;
  const annualInsurance = insuranceCost * 12;
  const annualMortgage = mortgage.monthlyPayment * 12;

  const netIncome = annualRent - annualManagementFee - annualMaintenance - annualInsurance - annualMortgage;
  const roi = (netIncome / deposit) * 100;
  const yieldGross = (annualRent / propertyPrice) * 100;
  const yieldNet = (netIncome / propertyPrice) * 100;

  return {
    monthlyMortgage: mortgage.monthlyPayment,
    annualIncome: annualRent,
    annualCosts: annualManagementFee + annualMaintenance + annualInsurance + annualMortgage,
    netIncome,
    roi,
    yieldGross,
    yieldNet
  };
}

export function calculateSAReturns({
  propertyPrice,
  deposit,
  interestRate,
  term,
  nightlyRate,
  occupancyRate,
  cleaningCost,
  platformFees,
  ...btlParams
}: SAParams) {
  // Calculate base BTL metrics
  const btlReturns = calculateBTLReturns({
    propertyPrice,
    deposit,
    interestRate,
    term,
    ...btlParams
  });

  // Calculate SA specific metrics
  const annualNights = Math.floor(365 * (occupancyRate / 100));
  const annualRevenue = nightlyRate * annualNights;
  const annualCleaning = cleaningCost * annualNights;
  const annualPlatformFees = (platformFees / 100) * annualRevenue;

  const netIncome = annualRevenue - annualCleaning - annualPlatformFees - btlReturns.annualCosts;
  const roi = (netIncome / deposit) * 100;
  const yieldGross = (annualRevenue / propertyPrice) * 100;
  const yieldNet = (netIncome / propertyPrice) * 100;

  return {
    ...btlReturns,
    annualRevenue,
    annualCleaning,
    annualPlatformFees,
    netIncome,
    roi,
    yieldGross,
    yieldNet,
    potentialUplift: ((netIncome - btlReturns.netIncome) / btlReturns.netIncome) * 100
  };
}