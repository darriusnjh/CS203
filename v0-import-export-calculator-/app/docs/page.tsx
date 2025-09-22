"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Search, 
  Code, 
  Key, 
  Globe, 
  Database, 
  ChevronRight,
  Copy,
  ExternalLink,
  Terminal,
  FileText,
  Zap,
  Shield,
  MessageSquare
} from "lucide-react"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const apiEndpoints = [
    {
      method: "POST",
      path: "/api/tariff/calculate",
      description: "Calculate tariff for a specific product",
      parameters: [
        { name: "htsCode", type: "string", required: true, description: "8-digit HTS code" },
        { name: "shipmentValue", type: "number", required: true, description: "Value of the shipment" },
        { name: "shipmentQuantity", type: "number", required: true, description: "Quantity of items" },
        { name: "countryOfOrigin", type: "string", required: true, description: "Origin country code" },
        { name: "countryOfArrival", type: "string", required: true, description: "Destination country code" }
      ]
    },
    {
      method: "GET",
      path: "/api/tariff/countries",
      description: "Get list of supported countries",
      parameters: []
    },
    {
      method: "GET",
      path: "/api/tariff/hts-codes",
      description: "Search HTS codes by description",
      parameters: [
        { name: "query", type: "string", required: true, description: "Search term" },
        { name: "limit", type: "number", required: false, description: "Maximum results (default: 10)" }
      ]
    }
  ]

  const codeExamples = {
    calculate: `curl -X POST "https://api.tariffcalc.com/api/tariff/calculate" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "htsCode": "12345678",
    "shipmentValue": 10000,
    "shipmentQuantity": 100,
    "countryOfOrigin": "CN",
    "countryOfArrival": "US"
  }'`,
    
    javascript: `const response = await fetch('https://api.tariffcalc.com/api/tariff/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    htsCode: '12345678',
    shipmentValue: 10000,
    shipmentQuantity: 100,
    countryOfOrigin: 'CN',
    countryOfArrival: 'US'
  })
});

const data = await response.json();
console.log(data);`,
    
    python: `import requests

url = "https://api.tariffcalc.com/api/tariff/calculate"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "htsCode": "12345678",
    "shipmentValue": 10000,
    "shipmentQuantity": 100,
    "countryOfOrigin": "CN",
    "countryOfArrival": "US"
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(result)`
  }

  const sdkLibraries = [
    {
      name: "JavaScript/Node.js",
      description: "Official SDK for JavaScript and Node.js applications",
      version: "v1.2.0",
      install: "npm install @tariffcalc/sdk",
      docs: "#"
    },
    {
      name: "Python",
      description: "Python SDK for server-side applications",
      version: "v1.1.5",
      install: "pip install tariffcalc-sdk",
      docs: "#"
    },
    {
      name: "PHP",
      description: "PHP SDK for web applications",
      version: "v1.0.8",
      install: "composer require tariffcalc/sdk",
      docs: "#"
    },
    {
      name: "Java",
      description: "Java SDK for enterprise applications",
      version: "v1.0.3",
      install: "Maven/Gradle dependency",
      docs: "#"
    }
  ]

  const quickStartSteps = [
    {
      title: "Get API Key",
      description: "Sign up for an account and generate your API key",
      code: "https://app.tariffcalc.com/api-keys"
    },
    {
      title: "Make Your First Request",
      description: "Test the API with a simple tariff calculation",
      code: codeExamples.calculate
    },
    {
      title: "Handle Responses",
      description: "Parse the response data and handle errors",
      code: `{
  "hts8": "12345678",
  "briefDescription": "Sample Product",
  "tariffAmount": 250.00,
  "totalCost": 10250.00,
  "tariffFound": true
}`
    }
  ]

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            API Documentation
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Developer Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Integrate TariffCalc Pro into your applications with our comprehensive API. 
            Get accurate tariff calculations, country data, and trade intelligence.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation, endpoints, or examples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get up and running with our API in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {quickStartSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="relative">
                      <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(step.code, `step-${index}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>

          {/* API Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-6">
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={endpoint.method === "POST" ? "destructive" : "secondary"}
                        className="font-mono"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </div>
                    <CardTitle className="text-lg">{endpoint.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {endpoint.parameters.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Parameters</h4>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-start gap-3 text-sm">
                              <code className="bg-muted px-2 py-1 rounded text-xs">
                                {param.name}
                              </code>
                              <Badge variant="outline" className="text-xs">
                                {param.type}
                              </Badge>
                              {param.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Required
                                </Badge>
                              )}
                              <span className="text-muted-foreground">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    cURL Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{codeExamples.calculate}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.calculate, "curl")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    JavaScript Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{codeExamples.javascript}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.javascript, "javascript")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      <code>{codeExamples.python}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.python, "python")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SDKs Tab */}
          <TabsContent value="sdks" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {sdkLibraries.map((sdk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{sdk.name}</CardTitle>
                      <Badge variant="outline">{sdk.version}</Badge>
                    </div>
                    <CardDescription>{sdk.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Installation</h4>
                      <div className="relative">
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          <code>{sdk.install}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(sdk.install, `install-${index}`)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reference Tab */}
          <TabsContent value="reference" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    All API requests require authentication using an API key. Include your API key in the Authorization header:
                  </p>
                  <div className="relative">
                    <pre className="bg-muted p-2 rounded text-xs">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY", "auth")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Rate Limits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Free Plan</span>
                      <Badge variant="outline">100 requests/hour</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Professional</span>
                      <Badge variant="outline">1,000 requests/hour</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Enterprise</span>
                      <Badge variant="outline">Unlimited</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Base URL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-2 rounded text-xs">
                      <code>https://api.tariffcalc.com</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => copyToClipboard("https://api.tariffcalc.com", "base-url")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Response Format
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    All API responses are returned in JSON format with the following structure:
                  </p>
                  <div className="relative">
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                      <code>{`{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2024-12-15T10:30:00Z"
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => copyToClipboard('{\n  "success": true,\n  "data": { ... },\n  "error": null,\n  "timestamp": "2024-12-15T10:30:00Z"\n}', "response-format")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  API Changelog
                </CardTitle>
                <CardDescription>
                  Track API updates and new features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  View Changelog
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Postman Collection
                </CardTitle>
                <CardDescription>
                  Import our API collection for testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Download Collection
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Developer Support
                </CardTitle>
                <CardDescription>
                  Get help from our developer team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
