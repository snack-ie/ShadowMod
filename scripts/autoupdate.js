const autoUpdate = (name, repo, branch) => {
    
    var modLocal = Vars.mods.locateMod(name).meta;
    
    Events.on(ClientLoadEvent, () => {
        if(!Core.settings.getBool("mod." + name + ".autoupdate-disabled")){
            Core.net.httpGet(
                "https://raw.githubusercontent.com/" + repo + "/" + branch + "/mod.json",
                (result) => {
                    var modJson = JSON.parse(result.getResultAsString());
                    var comparable = (number) => Number(number.toString().replace(".", ""));
                    if(comparable(modLocal.version) < comparable(modJson.version)){
                        Vars.ui.showCustomConfirm(
                            "Auto Update",
                            "Do you want to update the mod [accent]" + name + "[]?\n[red]v" + modLocal.version + "[] -> [green]v" + modJson.version + "[]",
                            "Yes",
                            "No",
                            () => {
                                Vars.ui.loadfrag.show();
                                Vars.ui.mods.show();
                                Vars.ui.mods.hide();
                                Vars.ui.mods.children.get(1).children.get(2).children.get(0).children.each(e => {
                                    if(e.toString().includes(modLocal.displayName)){
                                        e.children.get(1).children.get(1).fireClick();
                                        Core.scene.dialog.children.get(2).children.get(1).fireClick();
                                        if(Core.scene.dialog != null){
                                            Core.scene.dialog.hide();
                                        };
                                    };
                                });
                                Vars.ui.mods.show();
                                Vars.ui.mods.hide();
                                var isMobile = Vars.mobile;
                                Vars.mobile = false;
                                Vars.ui.mods.children.get(1).children.get(1).children.get(0).fireClick();
                                Core.scene.dialog.children.get(1).children.get(0).children.get(1).fireClick();
                                Core.scene.dialog.children.get(1).children.get(1).text = repo;
                                Core.scene.dialog.children.get(2).children.get(1).fireClick();
                                Vars.mobile = isMobile;
                                Events.on(Trigger.update.class, () => {
                                    Vars.ui.mods.children.get(1).children.get(2).children.get(0).children.each(e => {
                                        if(e.toString().includes(modJson.displayName + "\nv" + modJson.version)){
                                            Vars.ui.loadfrag.hide();
                                        };
                                    });
                                });
                            },
                            () => {
                                Log.warn("Auto Update for the mod [accent]" + name + "[] cancelled by the user.");
                            }
                        );
                    }else{
                        Log.info("Mod [accent]" + name + "[] is up to date (installed: [accent]" + modLocal.version + "[], latest: [accent]" + modJson.version + "[]), skipping Auto Update dialog.");
                    };
                },
                (error) => {
                    Log.err("Error while trying to get version info of mod [accent]" + name + "[]: \n" + error);
                }
            );
        };
    });
    
    Events.on(BlockInfoEvent, () => {
        if(Core.scene.dialog.toString().includes(modLocal.displayName)){
            if(Core.settings.getBool("mod." + name + ".autoupdate-disabled")){
                Vars.ui.content.children.get(2).button("Enable Auto Update", () => {
                    Core.settings.put("mod." + name + ".autoupdate-disabled", false);
                    Log.info("Auto Update for mod [accent]" + name + "[] is enabled");
                });
            }else{
                Vars.ui.content.children.get(2).button("Disable Auto Update", () => {
                    Core.settings.put("mod." + name + ".autoupdate-disabled", true);
                    Log.info("Auto Update for mod [accent]" + name + "[] is disabled");
                });
            };
            Core.scene.dialog.hidden(() => {
                Vars.ui.content.children.get(2).clearChildren();
                Vars.ui.content.addCloseButton();
            });
        };
    });
};

module.exports = {
    autoUpdate: autoUpdate
};
