import React from 'react';

import CharacterListItem from './CharacterListItem';

const CharacterList = ({ characters = [] }) => {
  console.log(characters);
  return (
    <section className="CharacterList">
      {characters.map(character => (
        <CharacterListItem key={character.id} character={character} />
      ))}
    </section>
  );
};

export default CharacterList;
