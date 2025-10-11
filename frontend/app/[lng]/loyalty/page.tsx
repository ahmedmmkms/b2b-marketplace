// app/[lng]/loyalty/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';

export default async function LoyaltyPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'Loyalty' });
  
  // Mock loyalty data
  const mockLoyalty = {
    id: 'loyalty-1',
    points: 1250,
    tier: lng === 'en' ? 'Silver' : 'فضي',
    nextTier: lng === 'en' ? 'Gold' : 'ذهبي',
    nextTierPoints: 2500,
    pointsToNextTier: 1250
  };
  
  // Mock rewards
  const mockRewards = [
    {
      id: 'reward-1',
      name: lng === 'en' ? '10% Discount Voucher' : 'قسيمة خصم 10%',
      pointsRequired: 500,
      description: lng === 'en' ? 'Get 10% off your next purchase' : 'احصل على 10% خصم على مشترياتك التالية'
    },
    {
      id: 'reward-2',
      name: lng === 'en' ? 'Free Shipping' : 'شحن مجاني',
      pointsRequired: 300,
      description: lng === 'en' ? 'Free shipping on your next order' : 'شحن مجاني لطلبك التالي'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {t('points')}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {mockLoyalty.points}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {t('current_tier')}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {mockLoyalty.tier}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {lng === 'en' ? 'Next Tier Progress' : 'تقدم المستوى التالي'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {lng === 'en' ? 'Earn' : 'اكسب'} {mockLoyalty.pointsToNextTier} {lng === 'en' ? 'more points to reach' : 'نقاط إضافية للوصول إلى'} {mockLoyalty.nextTier}
              </p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-yellow-500 h-4 rounded-full" 
                  style={{ width: `${(mockLoyalty.points / mockLoyalty.nextTierPoints) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>0</span>
                <span>{mockLoyalty.nextTier}: {mockLoyalty.nextTierPoints} {lng === 'en' ? 'points' : 'نقاط'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {t('rewards')}
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {mockRewards.map((reward) => (
                <li key={reward.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {reward.name}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {reward.pointsRequired} {lng === 'en' ? 'points' : 'نقاط'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {reward.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button>
                        {lng === 'en' ? 'Redeem' : 'استرداد'}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}