export const KV_LOADED = 'KV_LOADED';
export const KV_TOGGLE = 'KV_TOGGLE';
export const KV_MOVE = 'KV_MOVE';

export const KV_MOVE_UP = 'kv_move_up';
export const KV_MOVE_BOTTOM = 'kv_move_down';

export const loadKVList = (name, list) => ({
	type: KV_LOADED,
	name,
	list,
});

export const toggleKV = (name, id) => ({
	type: KV_TOGGLE,
	name,
	id,
});

export const moveKV = (name, src, tgt, moveType) => ({
	type: KV_MOVE,
	name,
	src,
	tgt,
	moveType,
});
