import { useState, useEffect, MouseEventHandler } from "react";
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc'

dayjs.extend(UTC);

interface Props {
  name: string;
  timezone: string;
  deleteClick: MouseEventHandler<HTMLButtonElement>;
}

const Watch = ({ name, timezone, deleteClick }: Props) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    
    const interval = setInterval(() => {
      const UTCTime = dayjs().utcOffset(Number(timezone), false).format('HH:mm:ss');

      setTime(UTCTime);
    }, 1000);

    return () => clearInterval(interval)
  }, [timezone]);

  return (
    <div className="watch">
      <p className="city">{ name }</p>
      <p className="time">{ time }</p>
      <button onClick={ deleteClick }>x</button>
    </div>
  );
}

export default Watch;