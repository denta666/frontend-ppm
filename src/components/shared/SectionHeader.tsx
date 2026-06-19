'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
  titleClass?: string;
  descClass?: string;
}

export default function SectionHeader({ subtitle, title, description, center = true, titleClass, descClass }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center' : ''}
    >
      {subtitle && (
        <p className="section-subtitle mb-2">{subtitle}</p>
      )}
      <h2 className={cn('section-title mb-4', titleClass)}>{title}</h2>
      {description && (
        <p className={cn('text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed', descClass, center && 'mx-auto')}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
