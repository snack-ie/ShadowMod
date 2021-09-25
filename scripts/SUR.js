/

// create the block type
const silo = extendContent(Block, "su-reactor", {

    // override the method to build configuration
    buildConfiguration(tile, table) {
        table.addImageButton(
            Icon.arrowUpSmall,
            Styles.clearTransi,

            // configure the tile to signal that it has been
            // pressed (this sync on client to server)
            run(() => tile.configure(0))
        ).size(50);
    },

    // override configure event
    configured(tile, value) {

        // make sure this silo has the items it needs to fire
        if (tile.entity.cons.valid()) {

            // triggering consumption makes it use up the
            // items it requires
            tile.entity.cons.trigger();
        }
    }
});
