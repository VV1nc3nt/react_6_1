import { useState } from 'react'

import Watch from './Watch'
import { nanoid } from 'nanoid';

interface Watch {
  id: string;
  name: string;
  timezone: string;
}

function WatchForm() {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [watches, setWatches] = useState<Watch[]>([]);

  const clearForm = () => {
    setName('');
    setTimezone('');
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleTimezone = (event: React.ChangeEvent<HTMLInputElement>) => setTimezone(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const watch = {
      id: nanoid(),
      name: name,
      timezone: timezone
    };

    clearForm();

    setWatches((prevState) => [...prevState, watch])
  };

  const deleteWatch = (id: string) => setWatches((prevState) => prevState.filter((element) => element.id !== id));

  return (
    <>
      <form className='time-form' onSubmit={ handleSubmit }>
        <label className='label' htmlFor="name">Название</label>
        <input 
          required
          name='name' 
          id='name' 
          type="text" 
          value={ name }
          onChange={ handleName }
        />
        <label className='label' htmlFor="timezone">Временная зона</label>
        <input 
          required
          name='timezone'
          id='timezone'
          type="number"
          value={ timezone }
          onChange={ handleTimezone }
        />
        <button type="submit">Добавить</button>
      </form>
      <div className="watches">
        {
          watches.map((watch) => {
            return <Watch key={ watch.id } name={ watch.name } timezone={ watch.timezone } deleteClick={ () => deleteWatch(watch.id) } />
          })
        }
      </div>
    </>
  )
}

export default WatchForm;
