import React from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
}

interface ServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'PREMIUM QUALITY',
    description: 'Engineered with cutting-edge materials for ultimate durability and performance.',
    icon: '💎',
    iconBgColor: 'bg-cyan-200',
  },
  {
    id: '2',
    title: 'FAST DELIVERY',
    description: 'Complimentary global express shipping on all orders over $300.',
    icon: '🚚',
    iconBgColor: 'bg-blue-200',
  },
  {
    id: '3',
    title: 'SECURE PAYMENTS',
    description: 'End-to-end encryption ensures your transactions are completely safe.',
    icon: '🔒',
    iconBgColor: 'bg-blue-300',
  },
  {
    id: '4',
    title: 'EXTENDED WARRANTY',
    description: 'Comprehensive coverage and easy returns for peace of mind on every purchase.',
    icon: '↻',
    iconBgColor: 'bg-red-200',
  },
];

export default function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-start">
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 rounded-full ${service.iconBgColor} flex items-center justify-center mb-6 transition duration-300 hover:scale-110`}
              >
                <span className="text-3xl">{service.icon}</span>
              </div>

              {/* Service Title */}
              <h3 className="text-sm font-bold text-blue-600 mb-3 tracking-wide">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
