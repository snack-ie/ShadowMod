let hmm = false;
Events.on(ClientLoadEvent, () => {
  if(!hmm){
    Vars.ui.showOkText("[accent]Lazy Alert[]", "[purple]ShadowMod[] \n \nThe creator of this mod is too lazy to finish it. Please go to his repository and spam PRs asking [red]WHEN[] [purple]SHADOW MOD[] YOU LAZY BOI. /n /n    - By Flin",
    () => {
      hmm = true;
    });
  }
});
