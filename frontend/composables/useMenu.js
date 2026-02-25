import { computed } from 'vue';

export const useMenu = (role) => {
  const menu = computed(() => {
    if (role.value === 'admin') {
      return [
        {
          label: 'Administration',
          items: [
            { label: 'Home', icon: 'mdi-home', to: '/home' },
            { label: 'Users', icon: 'mdi-account-group', to: '/admin/users' },
            { label: 'Topics', icon: 'mdi-format-list-bulleted-square', to: '/admin/topics' },
            { label: 'Indicators', icon: 'mdi-tune-variant', to: '/admin/indicators' },
            { label: 'Periods', icon: 'mdi-calendar-clock', to: '/admin/periods' },
            { label: 'Assignments', icon: 'mdi-account-switch', to: '/admin/assignments' },
            { label: 'Results', icon: 'mdi-chart-bar', to: '/admin/results' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { label: 'Normalized /60', icon: 'mdi-table-large', to: '/reports/normalized' },
            { label: 'Progress', icon: 'mdi-chart-donut', to: '/reports/progress' },
          ],
        },
      ];
    }

    if (role.value === 'evaluator') {
      return [
        {
          label: 'Evaluator',
          items: [
            { label: 'Home', icon: 'mdi-home', to: '/home' },
            { label: 'My Assignments', icon: 'mdi-clipboard-check', to: '/evaluator/assignments' },
            { label: 'History', icon: 'mdi-history', to: '/evaluator/history' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { label: 'Normalized /60', icon: 'mdi-table-large', to: '/reports/normalized' },
            { label: 'Progress', icon: 'mdi-chart-donut', to: '/reports/progress' },
          ],
        },
      ];
    }

    if (role.value === 'evaluatee') {
      return [
        {
          label: 'My Space',
          items: [
            { label: 'Home', icon: 'mdi-home', to: '/home' },
            { label: 'My Evaluation', icon: 'mdi-account-search', to: '/me/evaluation' },
            { label: 'Upload Evidence', icon: 'mdi-file-upload', to: '/me/evidence' },
            { label: 'Personal Report', icon: 'mdi-file-document', to: '/me/report' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { label: 'Normalized /60', icon: 'mdi-table-large', to: '/reports/normalized' },
          ],
        },
      ];
    }

    return [
      {
        label: 'Guest',
        items: [
          { label: 'Login', icon: 'mdi-login', to: '/login' },
        ],
      },
    ];
  });

  return { menu };
};
