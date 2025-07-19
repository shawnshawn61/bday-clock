import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Facebook, Zap, Users, Plus } from 'lucide-react';
import type { Birthday } from './BirthdayClock';

interface QuickBirthdayEntryProps {
  onAddBirthday: (birthday: Omit<Birthday, 'id'>) => void;
}

export const QuickBirthdayEntry = ({ onAddBirthday }: QuickBirthdayEntryProps) => {
  const [quickEntry, setQuickEntry] = useState('');
  const [batchEntry, setBatchEntry] = useState('');
  const [isQuickMode, setIsQuickMode] = useState(true);
  const quickInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isQuickMode && quickInputRef.current) {
      quickInputRef.current.focus();
    }
  }, [isQuickMode]);

  const parseBirthdayEntry = (entry: string): { name: string; month: number; day: number } | null => {
    // Support formats: "Name MM/DD", "Name MM-DD", "Name M/D", etc.
    const patterns = [
      /^(.+?)\s+(\d{1,2})[\/\-](\d{1,2})$/,
      /^(.+?)\s+(\d{1,2})\/(\d{1,2})$/,
      /^(.+?)\s+(\d{1,2})-(\d{1,2})$/,
    ];

    for (const pattern of patterns) {
      const match = entry.trim().match(pattern);
      if (match) {
        const [, name, monthStr, dayStr] = match;
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);
        
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
          return { name: name.trim(), month, day };
        }
      }
    }
    return null;
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quickEntry.trim()) return;

    const parsed = parseBirthdayEntry(quickEntry);
    if (!parsed) {
      toast({
        title: "Invalid Format",
        description: "Use format: Name MM/DD (e.g., 'John 12/25')",
        variant: "destructive",
      });
      return;
    }

    const formattedDate = `${parsed.month.toString().padStart(2, '0')}-${parsed.day.toString().padStart(2, '0')}`;
    
    onAddBirthday({
      name: parsed.name,
      date: formattedDate,
    });

    toast({
      title: "Birthday Added!",
      description: `${parsed.name}'s birthday on ${parsed.month}/${parsed.day}`,
    });

    setQuickEntry('');
    if (quickInputRef.current) {
      quickInputRef.current.focus();
    }
  };

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!batchEntry.trim()) return;

    const lines = batchEntry.split('\n').filter(line => line.trim());
    const results: { success: string[]; failed: string[] } = { success: [], failed: [] };

    lines.forEach(line => {
      const parsed = parseBirthdayEntry(line);
      if (parsed) {
        const formattedDate = `${parsed.month.toString().padStart(2, '0')}-${parsed.day.toString().padStart(2, '0')}`;
        onAddBirthday({
          name: parsed.name,
          date: formattedDate,
        });
        results.success.push(`${parsed.name} (${parsed.month}/${parsed.day})`);
      } else {
        results.failed.push(line);
      }
    });

    if (results.success.length > 0) {
      toast({
        title: `${results.success.length} Birthdays Added!`,
        description: results.success.slice(0, 3).join(', ') + (results.success.length > 3 ? '...' : ''),
      });
    }

    if (results.failed.length > 0) {
      toast({
        title: `${results.failed.length} Failed`,
        description: "Check format: Name MM/DD",
        variant: "destructive",
      });
    }

    setBatchEntry('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isQuickMode) {
        handleQuickSubmit(e);
      }
    }
  };

  return (
    <Card className="p-6 bg-card/90 backdrop-blur-sm border-photo-frame">
      {/* Header with Facebook prompt */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Facebook className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-foreground">
            Quick Birthday Entry
          </h3>
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Perfect for copying birthdays from Facebook! 📱
        </p>
        <div className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
          💡 Open Facebook birthdays in another tab, then quickly type here
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant={isQuickMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsQuickMode(true)}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Quick Entry
        </Button>
        <Button
          variant={!isQuickMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsQuickMode(false)}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Batch Entry
        </Button>
      </div>

      {isQuickMode ? (
        /* Quick Entry Mode */
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Type name and birthday (press Enter to add)
            </Label>
            <Input
              ref={quickInputRef}
              value={quickEntry}
              onChange={(e) => setQuickEntry(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Sarah 03/15"
              className="bg-input border-border text-foreground text-lg font-mono"
              autoComplete="off"
            />
            <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
              <span>• Format: Name MM/DD</span>
              <span>• Press Enter to add</span>
              <span>• Example: "Mike 07/22"</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-celebration text-celebration-foreground hover:bg-celebration/90 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Birthday
          </Button>
        </form>
      ) : (
        /* Batch Entry Mode */
        <form onSubmit={handleBatchSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Paste multiple birthdays (one per line)
            </Label>
            <Textarea
              ref={batchInputRef}
              value={batchEntry}
              onChange={(e) => setBatchEntry(e.target.value)}
              placeholder={`Sarah 03/15
Mike 07/22
Emma 11/08
David 12/03`}
              className="bg-input border-border text-foreground font-mono min-h-[120px]"
              autoComplete="off"
            />
            <div className="text-xs text-muted-foreground">
              <span>• One birthday per line</span>
              <span className="ml-3">• Format: Name MM/DD</span>
              <span className="ml-3">• Invalid entries will be skipped</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-celebration text-celebration-foreground hover:bg-celebration/90 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Add All Birthdays
          </Button>
        </form>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <Facebook className="w-4 h-4 text-blue-600" />
          Facebook Birthday Tips
        </h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>1. Open Facebook → Events → Birthdays</p>
          <p>2. See someone's birthday? Type "John 12/25" here</p>
          <p>3. Press Enter to add and continue</p>
          <p>4. For bulk: Copy multiple and paste in Batch mode</p>
        </div>
      </div>
    </Card>
  );
};