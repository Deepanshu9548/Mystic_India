
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, FileUp, Globe, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DataImporter: React.FC = () => {
  const [urlToFetch, setUrlToFetch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const { toast } = useToast();

  const handleFetchData = async () => {
    if (!urlToFetch) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to fetch data from.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use CORS proxy to fetch data from external URLs
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(`${corsProxy}${encodeURIComponent(urlToFetch)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.text();
      setResponseData(data);
      
      toast({
        title: "Data Fetched Successfully",
        description: `Content retrieved from ${urlToFetch}`,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error Fetching Data",
        description: error instanceof Error ? error.message : "Failed to fetch data from the URL",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      toast({
        title: "File Loaded",
        description: `${file.name} has been loaded successfully.`
      });
    };
    reader.onerror = () => {
      toast({
        title: "Error Reading File",
        description: "Failed to read the selected file.",
        variant: "destructive"
      });
    };
    reader.readAsText(file);
  };

  const handleSaveData = () => {
    // This is where you would normally save to a database
    // For this demo, we'll just show a toast
    toast({
      title: "Data Saved",
      description: "Data has been processed and saved (demo only).",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Data Importer</CardTitle>
        <CardDescription>
          Import data from external sources to enhance the Mystic India database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">
              <Globe className="mr-2 h-4 w-4" />
              Fetch from URL
            </TabsTrigger>
            <TabsTrigger value="file">
              <FileUp className="mr-2 h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Enter URL to fetch data (e.g., https://example.com/data.json)"
                value={urlToFetch}
                onChange={(e) => setUrlToFetch(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleFetchData} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching...
                  </>
                ) : 'Fetch Data'}
              </Button>
            </div>
            {responseData && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Response:</p>
                <Textarea
                  className="font-mono text-sm h-80"
                  value={responseData}
                  onChange={(e) => setResponseData(e.target.value)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4 mt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label 
                htmlFor="file-upload" 
                className="bg-muted hover:bg-muted/80 text-center py-8 rounded-md cursor-pointer border-2 border-dashed border-muted-foreground/50"
              >
                <FileUp className="mx-auto h-6 w-6 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload a file or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JSON, CSV, or TXT
                </p>
              </label>
              <Input
                id="file-upload"
                type="file"
                accept=".json,.csv,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            
            {fileContent && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">File Content:</p>
                <Textarea
                  className="font-mono text-sm h-80"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {(responseData || fileContent) && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveData} className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Process & Save Data
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DataImporter;
