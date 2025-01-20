import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

/**
 * Хранилище пользователя
 * Это хранилище управляет никнеймом пользователя и его сохранением в localStorage.
 */
export const useUserStore = defineStore('user', () => {
    // Переменные для никнейма и ввода никнейма
    const nickname = ref('');
    const nicknameInput = ref('');

    /**
     * Получить никнейм из localStorage
     * @returns {string} Никнейм, сохраненный в localStorage, или пустую строку, если никнейм не задан.
     */
    const getNicknameFromLocalStorage = () => {
        return localStorage.getItem('nickname') || '';
    };

    /**
     * Сохранить никнейм в localStorage
     * Устанавливает значение никнейма из поля ввода и сохраняет его в localStorage.
     */
    const saveNicknameToLocalStorage = () => {
        nickname.value = nicknameInput.value;
        localStorage.setItem('nickname', nicknameInput.value);
    };

    /**
     * Удалить никнейм из localStorage
     * Удаляет значение никнейма из localStorage и сбрасывает реактивные переменные.
     */
    const clearNicknameFromLocalStorage = () => {
        localStorage.removeItem('nickname');
        nickname.value = '';
        nicknameInput.value = '';
    };

    // Возвращаемые значения, чтобы их можно было использовать в компонентах Vue
    return { nickname, nicknameInput, getNicknameFromLocalStorage, saveNicknameToLocalStorage, clearNicknameFromLocalStorage };
});