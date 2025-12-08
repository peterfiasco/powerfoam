import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useUserRole, roleConfigs, UserRole } from '../contexts/UserRoleContext';
import { 
  User, 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Landmark, 
  FileText,
  Database,
  ChevronRight,
  Check
} from 'lucide-react';

interface RoleSelectorProps {
  open: boolean;
  onClose: () => void;
}

const roleIcons: Record<UserRole, any> = {
  individual: User,
  'family-office': Users,
  institutional: Building2,
  stockbroker: Briefcase,
  'fund-company': TrendingUp,
  sec: Shield,
  cbn: Landmark,
  firs: FileText,
  cscs: Database,
};

const roleCategories = [
  {
    title: 'Investors',
    roles: ['individual', 'family-office', 'institutional', 'fund-company'] as UserRole[],
  },
  {
    title: 'Market Participants',
    roles: ['stockbroker'] as UserRole[],
  },
  {
    title: 'Regulatory & Infrastructure',
    roles: ['sec', 'cbn', 'firs', 'cscs'] as UserRole[],
  },
];

export function RoleSelector({ open, onClose }: RoleSelectorProps) {
  const { role: currentRole, setRole } = useUserRole();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>Select Account Type</DialogTitle>
          <DialogDescription>
            Choose your account profile to access features tailored to your needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {roleCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-gray-900">{category.title}</h3>
              <div className="grid gap-3">
                {category.roles.map((roleKey) => {
                  const config = roleConfigs[roleKey];
                  const Icon = roleIcons[roleKey];
                  const isSelected = currentRole === roleKey;
                  const isRegulator = config.isRegulator;

                  return (
                    <Card
                      key={roleKey}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#008753] bg-[#008753]/5 shadow-md'
                          : 'border-gray-200 hover:border-[#008753]/50 hover:shadow-sm'
                      }`}
                      onClick={() => handleRoleSelect(roleKey)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            isRegulator ? 'bg-blue-50' : 'bg-[#008753]/10'
                          }`}>
                            <Icon 
                              size={24} 
                              className={isRegulator ? 'text-blue-600' : 'text-[#008753]'}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-gray-900">{config.name}</h4>
                              {isSelected && (
                                <Badge className="bg-[#008753] hover:bg-[#006d42]">
                                  <Check size={12} className="mr-1" />
                                  Active
                                </Badge>
                              )}
                              {!config.canTrade && (
                                <Badge variant="outline" className="text-xs">
                                  {roleKey === 'cscs' ? 'View Only' : 'Regulatory'}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-3">
                              {config.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {config.features.slice(0, 4).map((feature) => (
                                <Badge 
                                  key={feature} 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {feature.split('-').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  ).join(' ')}
                                </Badge>
                              ))}
                              {config.features.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{config.features.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ChevronRight 
                            size={20} 
                            className={isSelected ? 'text-[#008753]' : 'text-gray-400'}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-[#008753] hover:bg-[#006d42]"
            onClick={onClose}
          >
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
