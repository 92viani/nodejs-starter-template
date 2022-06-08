import type { NextPage } from 'next';
import { DatePicker } from 'antd';
import { DatePicker as JalaliDatePicker, Calendar } from 'antd-jalali';
import dayjs from 'dayjs';

const Home: NextPage = () => {
  return (
    <>
      <Calendar defaultValue={dayjs('1401-03-15')} />
    </>
  );
};

export default Home;
