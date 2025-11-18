import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion';

const CookingCalculatorApp = () => {
  // Common conversion factors
  const conversions = {
    // Volume
    cups_to_ml: 236.588,
    tbsp_to_ml: 14.787,
    tsp_to_ml: 4.929,
    // Weight
    oz_to_g: 28.3495,
    lb_to_g: 453.592,
  };

  // Basic scaling calculator
  const ScalingCalculator = () => {
    const [servings, setServings] = useState(1);
    const [originalServings, setOriginalServings] = useState(4);
    const [amount, setAmount] = useState(1);
    
    const scaledAmount = (amount * servings / originalServings).toFixed(2);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Original Servings</label>
            <input
              type="number"
              min="1"
              value={originalServings}
              onChange={(e) => setOriginalServings(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Desired Servings</label>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Amount</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-lg font-medium">Scaled Amount: {scaledAmount}</p>
        </div>
      </div>
    );
  };

  // Volume converter
  const VolumeConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromUnit, setFromUnit] = useState('cups');
    const [toUnit, setToUnit] = useState('ml');
    
    const convert = () => {
      let ml;
      switch(fromUnit) {
        case 'cups':
          ml = amount * conversions.cups_to_ml;
          break;
        case 'tbsp':
          ml = amount * conversions.tbsp_to_ml;
          break;
        case 'tsp':
          ml = amount * conversions.tsp_to_ml;
          break;
        default:
          ml = amount;
      }
      
      switch(toUnit) {
        case 'cups':
          return (ml / conversions.cups_to_ml).toFixed(2);
        case 'tbsp':
          return (ml / conversions.tbsp_to_ml).toFixed(2);
        case 'tsp':
          return (ml / conversions.tsp_to_ml).toFixed(2);
        default:
          return ml.toFixed(2);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cups">Cups</option>
              <option value="tbsp">Tablespoons</option>
              <option value="tsp">Teaspoons</option>
              <option value="ml">Milliliters</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="cups">Cups</option>
            <option value="tbsp">Tablespoons</option>
            <option value="tsp">Teaspoons</option>
            <option value="ml">Milliliters</option>
          </select>
        </div>
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-lg font-medium">
            Result: {convert()} {toUnit}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-10 w-10">
                <circle cx="32" cy="32" r="30" fill="#2563eb" />
                <path d="M20 44V24H44V44Z" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="3"
                      strokeLinejoin="round" />
                <line x1="24" y1="28" x2="28" y2="28" stroke="white" strokeWidth="2" />
                <line x1="24" y1="34" x2="28" y2="34" stroke="white" strokeWidth="2" />
                <line x1="24" y1="40" x2="28" y2="40" stroke="white" strokeWidth="2" />
                <path d="M44 28H48C48 28 50 28 50 30V34C50 36 48 36 48 36H44" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="3"
                      strokeLinejoin="round" />
                <path d="M20 24L16 20H24L20 24" 
                      fill="white" 
                      stroke="white" 
                      strokeWidth="1" />
              </svg>
              <span className="text-xl font-bold text-gray-900">kitchenometry.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ad space - top banner */}
      <div className="w-full h-24 bg-gray-200 flex items-center justify-center border-b">
        <span className="text-gray-500">Ad Space (728x90)</span>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main content area */}
        <div className="flex-1">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cooking Calculators</CardTitle>
              <CardDescription>
                Simple tools to help you scale recipes and convert measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="volume" className="w-full">
                <TabsList>
                  <TabsTrigger value="scale">Recipe Scaling</TabsTrigger>
                  <TabsTrigger value="volume">Volume Conversion</TabsTrigger>
                </TabsList>
                <TabsContent value="scale">
                  <ScalingCalculator />
                </TabsContent>
                <TabsContent value="volume">
                  <VolumeConverter />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Affiliate Products Accordion */}
          <Card className="my-8">
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
              <CardDescription>Our curated selection of essential kitchen tools</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="kitchen-scales">
                  <AccordionTrigger>Recommended Kitchen Scales</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {/* Amazon Affiliate Product Blocks */}
                      <div className="border rounded p-4 h-96 flex flex-col">
                        <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center">
                          <span className="text-gray-500">Product Image</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium mb-2">Product Title</h4>
                          <p className="text-sm text-gray-600 mb-4">Product Description</p>
                        </div>
                        <div className="mt-auto">
                          <div className="text-lg font-bold mb-2">$XX.XX</div>
                          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                            View on Amazon
                          </button>
                        </div>
                      </div>
                      {/* Additional product blocks ... */}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="measuring-tools">
                  <AccordionTrigger>Essential Measuring Tools</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {/* Amazon Affiliate Product Blocks */}
                      <div className="border rounded p-4 h-96 flex flex-col">
                        <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center">
                          <span className="text-gray-500">Product Image</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium mb-2">Product Title</h4>
                          <p className="text-sm text-gray-600 mb-4">Product Description</p>
                        </div>
                        <div className="mt-auto">
                          <div className="text-lg font-bold mb-2">$XX.XX</div>
                          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                            View on Amazon
                          </button>
                        </div>
                      </div>
                      {/* Additional product blocks ... */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recipe Scaling Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Flour and Liquid Ratios</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For bread recipes, maintain the flour-to-liquid ratio (hydration percentage). If a recipe calls for 3 cups flour and 1.5 cups water (50% hydration), keep this ratio when scaling.</li>
                    <li>Different flours absorb different amounts of liquid. When scaling recipes with whole wheat or rye flour, you may need to increase liquids by 5-10%.</li>
                    <li>For high-altitude baking (above 3,000 feet), decrease liquids by about 1-2 tablespoons per cup when scaling up recipes with substantial flour content.</li>
                    <li>In recipes where flour is the main dry ingredient, consider the protein content when scaling. Higher protein flours (bread flour) typically require more liquid than all-purpose flour.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">General Scaling Rules</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cooking times may need to be adjusted when scaling up or down - they don't scale linearly with quantity</li>
                    <li>Spices and seasonings should be scaled gradually - start with 75% of the calculated amount and adjust to taste</li>
                    <li>Cooking temperatures generally remain the same regardless of scale</li>
                    <li>Some ingredients (like eggs) may need special consideration - round to the nearest whole egg</li>
                    <li>For leavening agents (baking powder, baking soda), scale precisely as they affect chemical reactions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar for vertical ad space */}
        <div className="md:w-64 space-y-4">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Ad Space (300x250)</span>
          </div>
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Ad Space (300x600)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingCalculatorApp;