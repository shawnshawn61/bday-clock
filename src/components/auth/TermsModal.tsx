import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'terms' | 'privacy';
}

export const TermsModal = ({ open, onOpenChange, type }: TermsModalProps) => {
  const content = type === 'terms' ? {
    title: "Terms & Conditions",
    content: `
Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By using Bday O'Clock, you agree to these terms and conditions.

2. DATA COLLECTION AND USE
We collect and use your data to:
- Provide personalized birthday notifications
- Suggest relevant gift options
- Improve our service
- Marketing and promotional purposes
- Commercial data analysis

3. PERSONAL INFORMATION
We collect:
- Email address
- Birthday information
- Friend birthdays you add
- Usage patterns and preferences
- Purchase history and interests

4. DATA SHARING
We may share your data with:
- Third-party advertising partners
- Gift recommendation services
- Analytics providers
- Marketing partners

5. COMMERCIAL USE
Your data helps us provide targeted gift suggestions and promotional offers that may interest you.

6. USER RESPONSIBILITIES
- Provide accurate information
- Respect others' privacy
- Use the service appropriately

7. SERVICE AVAILABILITY
We reserve the right to modify or discontinue the service at any time.

8. LIMITATION OF LIABILITY
Use of this service is at your own risk.

9. GOVERNING LAW
These terms are governed by applicable laws.

10. CHANGES TO TERMS
We may update these terms at any time. Continued use constitutes acceptance.
    `
  } : {
    title: "Privacy Policy",
    content: `
Last updated: ${new Date().toLocaleDateString()}

1. INFORMATION WE COLLECT
- Personal identifiers (email, birthday)
- Friend information you add
- Usage data and preferences
- Device and browser information
- Location data (if permitted)

2. HOW WE USE YOUR INFORMATION
- Personalized birthday notifications
- Gift recommendations
- Marketing communications
- Service improvement
- Data analytics for commercial purposes

3. DATA SHARING
We share your information with:
- Advertising networks
- E-commerce partners
- Analytics services
- Marketing platforms
- Gift and retail partners

4. COMMERCIAL DATA USE
Your data is valuable for:
- Targeted advertising
- Product recommendations
- Market research
- Trend analysis
- Revenue generation through partnerships

5. COOKIES AND TRACKING
We use cookies and similar technologies to track your behavior and preferences.

6. DATA RETENTION
We retain your data for as long as your account is active and for commercial purposes thereafter.

7. YOUR RIGHTS
Depending on your location, you may have rights to:
- Access your data
- Correct inaccuracies
- Request deletion (subject to our commercial interests)
- Opt-out of certain uses

8. SECURITY
We implement reasonable security measures but cannot guarantee complete protection.

9. INTERNATIONAL TRANSFERS
Your data may be transferred globally for processing and commercial use.

10. CONTACT
For privacy questions, contact us through the app.
    `
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>
            Please read carefully
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full rounded-md border p-4">
          <div className="whitespace-pre-wrap text-sm">
            {content.content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};