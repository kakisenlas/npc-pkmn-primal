document.addEventListener('DOMContentLoaded', () => {
  const npcs = [...document.querySelectorAll('div[id^=npc-]')];

  npcs.forEach((npc) => {
    /* Team / Description handling */
    const buttons = [...document.querySelectorAll(`#${npc.id} div[id^=menu-]`)];
    const sections = [
      ...document.querySelectorAll(`#${npc.id} div[id^=section-]`)
    ];

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if ([...btn.classList].includes('selected')) return;
        btn.classList.add('selected');

        buttons
          .filter((b) => b.id !== btn.id)
          .forEach((b) => b.classList.remove('selected'));

        const section = sections.find(
          (s) => s.id === btn.getAttribute('section')
        );

        section.classList.add('active');

        sections
          .filter((s) => s.id !== btn.getAttribute('section'))
          .forEach((s) => s.classList.remove('active'));
      });
    });

    /* Current pokémon handling */
    const pkmns = [...document.querySelectorAll(`#${npc.id} .pkmn`)];

    pkmns.forEach((pkmn) => {
      pkmn.addEventListener('click', () => {
        if ([...pkmn.classList].includes('active')) return;
        pkmn.classList.add('active');

        pkmns
          .filter((p) => p.id !== pkmn.id)
          .forEach((p) => p.classList.remove('active'));

        // --------------------------------

        const current = document.querySelector(`#${npc.id} #current-pokemon`);
        current.classList.add('active');

        const data = pkmn.querySelector(`#${npc.id} img`);

        const name = data.getAttribute('p-name');
        const moves = data.getAttribute('p-moves').split(',');
        const abilityName = data.getAttribute('p-ability-name');
        const abilityDesc = data.getAttribute('p-ability-desc');

        // Name
        const currentName = current.querySelector(`#${npc.id} .name`);
        currentName.innerHTML = name;

        // Moves
        const currentMovements = [
          ...current.querySelectorAll(`#${npc.id} .move`)
        ];
        currentMovements.forEach((move, i) => {
          if (moves[i] === undefined) {
            move.innerHTML = '---';
            return;
          }
          move.innerHTML = moves[i];
        });

        // Ability name
        const currentAbilityName = current.querySelector(
          `#${npc.id} .ability > .name`
        );
        currentAbilityName.innerHTML = abilityName;

        // Ability desc
        const currentAbilityDesc = current.querySelector(
          `#${npc.id} .ability > .desc`
        );
        currentAbilityDesc.innerHTML = abilityDesc;

        // --------------------------------

        const currentClose = current.querySelector(
          `#${npc.id} #current-pokemon > .close`
        );
        currentClose.addEventListener('click', () => {
          current.classList.remove('active');

          pkmns.forEach((p) => p.classList.remove('active'));
        });
      });
    });
  });
});
