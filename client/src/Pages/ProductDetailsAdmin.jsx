import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/Layout";
import { ArrowLeft, Edit, Trash2, BarChart3, Users, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";

const productData ={
  "1": { name: "Starter Kit", emoji: "🚀", price: "$29/mo", category: "SaaS", description: "Perfect for small teams getting started. Includes core features with basic analytics and up to 5 team members.", features: ["Up to 5 users", "Basic analytics", "Email support", "1GB storage"] },
  "2": { name: "Pro Plan", emoji: "⚡", price: "$49/mo", category: "SaaS", description: "For growing teams that need advanced tools. Includes premium features, priority support, and more.", features: ["Up to 25 users", "Advanced analytics", "Priority support", "10GB storage", "API access"] },
  "3": { name: "Enterprise", emoji: "🏢", price: "$199/mo", category: "SaaS", description: "Full-featured solution for large organizations. Custom integrations, dedicated support, and unlimited everything.", features: ["Unlimited users", "Custom analytics", "Dedicated support", "Unlimited storage", "Custom integrations", "SLA guarantee"] },
  "4": { name: "API Access", emoji: "🔗", price: "$19/mo", category: "Add-on", description: "Programmatic access to all platform features via REST and GraphQL APIs.", features: ["REST API", "GraphQL API", "Webhooks", "Rate limiting"] },
  "5": { name: "White Label", emoji: "🏷️", price: "$99/mo", category: "Add-on", description: "Remove branding and customize the platform with your own logo and colors.", features: ["Custom branding", "Custom domain", "Custom emails", "White-label reports"] },
  "6": { name: "Custom Integration", emoji: "🔧", price: "$499", category: "Service", description: "Our team builds a custom integration tailored to your specific workflow needs.", features: ["Custom development", "Dedicated engineer", "30-day delivery", "3 revision rounds"] },
};

const metrics = [
  { label: "Active Users", value: "1,234", icon: Users },
  { label: "Monthly Revenue", value: "$12,450", icon: DollarSign },
  { label: "Conversion Rate", value: "24.5%", icon: BarChart3 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id || "1"] || productData["1"];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/products"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl">{product.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h1 className="font-heading text-2xl font-bold">{product.name}</h1>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="font-heading text-xl font-bold text-primary mt-2">{product.price}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
              <h3 className="font-heading font-semibold mb-4">Features</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full gradient-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card rounded-xl border border-border p-5 shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <m.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                </div>
                <div className="font-heading text-xl font-bold">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
