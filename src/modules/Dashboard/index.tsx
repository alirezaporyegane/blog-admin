import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  console.log((t));
  return <div>{t('test')}</div>
}

export default Dashboard
