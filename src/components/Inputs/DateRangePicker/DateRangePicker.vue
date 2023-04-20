<template>
  <section>
    <div class="input-container">
      <input
        v-model="inputValue"
        class="pb"
        :style="getInputStyle"
        :placeholder="inputValue"
        type="text"
        @click="toggleDatePicker"
      />
      <PbIcon
        class="calendar-icon"
        :style="iconStyle"
        icon="fas fa-calendar-alt"
        @click.native="toggleDatePicker"
      />
    </div>

    <div class="dropdown">
      <div
        v-if="state.isPickerVisible"
        :class="`calendars-main-container calendars-on-${calendarsPosition}`"
      >
        <div class="filters-container">
          <p
            v-for="period in Object.keys(state.periods)"
            :key="period"
            class="pb-md"
            :style="filterStyle(period)"
            @click="selectPeriod(period)"
          >
            {{ period }}
          </p>
        </div>
        <div class="calendars-container">
          <div class="calendars">
            <div class="calendar">
              <div class="calendar-header">
                <div class="month-selector">
                  <div class="calendar-header-button">
                    <PbButton
                      class="icon-left"
                      button-style="regular"
                      color="primary"
                      button-size="large"
                      icon-position="left"
                      icon="fas fa-chevron-up"
                      @click.native="changeMonth('startDate', 'prev')"
                    />
                  </div>
                  <div class="selector">
                    <div
                      :class="getSelectorClass('month')"
                      @click="toggleMonthsSelector('startDate')"
                    >
                      <p class="pb-md">{{ monthTitle("startDate") }}</p>
                    </div>
                    <ul
                      v-if="state.isMonthSelectorOpen.startDate"
                      class="selector-list start-month-input"
                    >
                      <li v-for="month in state.monthOptions" :key="month">
                        <p class="pb" @click="selectMonth('startDate', month)">
                          {{ month }}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="calendar-header-button">
                    <PbButton
                      class="icon-right"
                      button-style="regular"
                      color="primary"
                      button-size="large"
                      icon-position="left"
                      icon="fas fa-chevron-up"
                      @click.native="changeMonth('startDate', 'next')"
                    />
                  </div>
                </div>
                <div class="selector">
                  <div
                    :class="getSelectorClass('year')"
                    @click="toggleYearsSelector('startDate')"
                  >
                    <p class="pb-md">{{ yearTitle("startDate") }}</p>
                    <PbIcon
                      style="color: var(--color-primary)"
                      icon="fas fa-chevron-up"
                      class="fa"
                      :class="['fa-rotate-180']"
                    />
                  </div>
                  <ul
                    v-if="state.isYearSelectorOpen.startDate"
                    class="selector-list start-input"
                  >
                    <li v-for="year in state.yearOptions" :key="year">
                      <p class="pb" @click="selectYear('startDate', year)">
                        {{ year }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="calendar-days">
                <small
                  v-for="weekday in state.weekdays"
                  :key="weekday.id"
                  class="pb weekdays"
                >
                  {{ weekday }}
                </small>
                <p
                  v-for="day in days('startDate')"
                  :key="day.id"
                  class="pb day"
                  :class="daysOnRange(day.date)"
                  @click="selectDay('startDate', day.id)"
                >
                  {{ day.id }}
                </p>
              </div>
            </div>
            <div class="calendar">
              <div class="calendar-header">
                <div class="month-selector">
                  <div class="calendar-header-button">
                    <PbButton
                      class="icon-left"
                      button-style="regular"
                      color="primary"
                      button-size="large"
                      icon-position="left"
                      icon="fas fa-chevron-up"
                      @click.native="changeMonth('endDate', 'prev')"
                    />
                  </div>
                  <div class="selector">
                    <div
                      :class="getSelectorClass('month')"
                      @click="toggleMonthsSelector('endDate')"
                    >
                      <p class="pb-md">{{ monthTitle("endDate") }}</p>
                    </div>
                    <ul
                      v-if="state.isMonthSelectorOpen.endDate"
                      class="selector-list end-month-input"
                    >
                      <li v-for="month in state.monthOptions" :key="month">
                        <p class="pb" @click="selectMonth('endDate', month)">
                          {{ month }}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="calendar-header-button">
                    <PbButton
                      class="icon-right"
                      button-style="regular"
                      color="primary"
                      button-size="large"
                      icon-position="left"
                      icon="fas fa-chevron-up"
                      @click.native="changeMonth('endDate', 'next')"
                    />
                  </div>
                </div>
                <div class="selector">
                  <div
                    :class="getSelectorClass('year')"
                    @click="toggleYearsSelector('endDate')"
                  >
                    <p class="pb-md">{{ yearTitle("endDate") }}</p>
                    <PbIcon
                      style="color: var(--color-primary)"
                      icon="fas fa-chevron-up"
                      :class="['fa-rotate-180']"
                    />
                  </div>
                  <ul
                    v-if="state.isYearSelectorOpen.endDate"
                    class="selector-list end-input"
                  >
                    <li v-for="year in state.yearOptions" :key="year">
                      <p class="pb" @click="selectYear('endDate', year)">
                        {{ year }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="calendar-days">
                <small
                  v-for="weekday in state.weekdays"
                  :key="weekday.id"
                  class="pb weekdays"
                >
                  {{ weekday }}
                </small>
                <p
                  v-for="day in days('endDate')"
                  :key="day.id"
                  class="pb day"
                  :class="daysOnRange(day.date)"
                  @click="selectDay('endDate', day.id)"
                >
                  {{ day.id }}
                </p>
              </div>
            </div>
          </div>
          <div class="buttons-container">
            <div class="period-visualizer">
              <p class="pb-md">{{ selectedPeriod }}</p>
            </div>
            <div class="buttons">
              <PbButton
                style="width: 100px; margin-right: 8px"
                color="gray-40"
                label="Redefinir"
                button-style="background-light"
                @click.native="resetDates()"
              />
              <PbButton
                style="width: 86px"
                color="primary"
                label="Aplicar"
                button-style="background"
                @click.native="saveDates()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PbButton, PbIcon } from '@pb';
import { capitalizeFirstLetter, decreaseDate } from 'adapcon-utils-js';

export default {
  name: 'PbDateRangePicker',

  components: {
    PbButton,
    PbIcon,
  },

  props: {
    value: { type: Object, default: () => {} },
    calendarsPosition: { type: String, default: 'right' },
    inputStyle: { type: String, default: 'background-light' },
  },

  data() {
    return {
      state: {
        inputValue: {
          startDate: '',
          endDate: '',
        },
        monthOptions: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        isMonthSelectorOpen: {
          open: false,
          startDate: '',
          endDate: '',
        },
        yearOptions: [],
        isYearSelectorOpen: {
          open: false,
          startDate: '',
          endDate: '',
        },
        weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        isPickerVisible: false,
        periods: {
          Hoje: {
            startDate: new Date(),
            endDate: new Date(),
          },
          'Últimos 30 dias': {
            startDate: decreaseDate(new Date(), { day: 30 }),
            endDate: new Date(),
          },
          'Últimos 6 meses': {
            startDate: decreaseDate(new Date(), { month: 6 }),
            endDate: new Date(),
          },
          'Últimos 12 meses': {
            startDate: decreaseDate(new Date(), { month: 12 }),
            endDate: new Date(),
          },
        },
        selectedFilterPeriod: '',
      },
    };
  },

  computed: {
    getInputStyle() {
      const inputStyles = {
        'background-light': {
          'background-color': 'var(--color-gray)',
          color:
            this.state.isPickerVisible || this.state.inputValue.startDate
              ? 'var(--color-gray-90)'
              : 'var(--color-gray-40)',
          border: this.state.isPickerVisible
            ? '1px solid var(--color-gray-90)'
            : '1px solid var(--color-gray-5) !important',
          borderRadius: this.state.isPickerVisible ? '20px 20px 0 0' : '20px',
        },

        outline: {
          color:
          this.state.isPickerVisible || this.state.inputValue.startDate
            ? 'var(--color-gray-90)'
            : 'var(--color-gray-40)',
          border: this.state.isPickerVisible
            ? '1px solid var(--color-gray-90)'
            : '1px solid var(--color-gray-5) !important',
          borderRadius: this.state.isPickerVisible ? '20px 20px 0 0' : '20px',
        },
      };

      return inputStyles[this.inputStyle];
    },

    iconStyle() {
      return this.state.isPickerVisible || this.state.inputValue.startDate
        ? 'color: var(--color-gray-90)'
        : 'color: var(--color-gray-40)';
    },

    inputValue() {
      return this.state.inputValue.startDate === ''
        ? 'Selecione um período'
        : `${this.formatDate(
          this.state.inputValue.startDate,
        )} - ${this.formatDate(this.state.inputValue.endDate)}`;
    },

    selectedPeriod() {
      return this.state.inputValue.startDate ? this.inputValue : 'Início - Fim';
    },
  },

  mounted() {
    this.state.inputValue = this.value;
  },

  methods: {
    getCurrentDate(dateType) {
      return this.state.inputValue[dateType] || new Date();
    },
    filterStyle(period) {
      return this.state.selectedFilterPeriod === period
        ? 'background: rgba(var(--color-primary-rgb), 0.12); color: var(--color-primary)'
        : '';
    },
    toggleDatePicker() {
      this.state.isPickerVisible = !this.state.isPickerVisible;
    },

    monthTitle(dateType) {
      const month = this.getCurrentDate(dateType).toLocaleString(
        'default',
        {
          month: 'long',
        },
      );

      return capitalizeFirstLetter(month.slice(0, 3));
    },

    getSelectorClass(selectorType) {
      const bySelector = {
        month: this.state.isMonthSelectorOpen,
        year: this.state.isYearSelectorOpen,
      };
      return bySelector[selectorType].startDate
        ? 'input input-opened'
        : 'input';
    },

    toggleMonthsSelector(dateType) {
      this.state.isMonthSelectorOpen[dateType] = !this.state.isMonthSelectorOpen[dateType];
    },

    yearTitle(dateType) {
      return this.getCurrentDate(dateType).getFullYear();
    },

    selectMonth(dateType, month) {
      const date = this.getCurrentDate(dateType);
      const monthIndex = this.state.monthOptions.indexOf(month);
      date.setMonth(monthIndex);

      if (
        (dateType === 'startDate'
          && date > this.state.inputValue.endDate)
        || (dateType === 'endDate' && date < this.state.inputValue.startDate)
      ) {
        this.state.inputValue.endDate = date;
        this.state.inputValue.startDate = date;
      } else {
        this.state.inputValue[dateType] = date;
      }

      this.state.isMonthSelectorOpen[dateType] = false;
    },

    toggleYearsSelector(dateType) {
      this.state.isYearSelectorOpen[dateType] = !this.state.isYearSelectorOpen[dateType];
      
      const year = this.getCurrentDate(dateType).getFullYear();
      const yearOptions = [...Array(10).keys()].map(i => i + year - 5);

      this.state.yearOptions = yearOptions;
    },

    selectYear(dateType, year) {
      const date = this.getCurrentDate(dateType);
      date.setFullYear(year);

      if (
        (dateType === 'startDate'
          && date > this.state.inputValue.endDate)
        || (dateType === 'endDate' && date < this.state.inputValue.startDate)
      ) {
        this.state.inputValue.endDate = date;
        this.state.inputValue.startDate = date;
      } else {
        this.state.inputValue[dateType] = date;
      }

      this.state.isYearSelectorOpen[dateType] = false;
    },

    days(dateType, monthOffset = 0) {
      const date = this.getCurrentDate(dateType);
      date.setMonth(date.getMonth() + monthOffset);

      const month = date.getMonth();
      const year = date.getFullYear();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [...Array(daysInMonth).keys()].map(day => day + 1);

      const dates = days.map((day, index) => {
        const id = index + 1;
        const dateObj = new Date(year, month, day);
        return { id, date: dateObj };
      });

      const emptyDays = [...Array(firstDay).fill({ id: null, date: null })];
      return [...emptyDays, ...dates];
    },

    selectDay(dateType, day) {
      const startDate = new Date(this.getCurrentDate('startDate'));
      const endDate = new Date(this.getCurrentDate('endDate'));

      if (day === null) return;

      if (dateType === 'startDate') {
        const newStartDate = startDate;
        newStartDate.setDate(day);

        if (newStartDate > endDate) {
          this.state.inputValue = {
            startDate: newStartDate,
            endDate: newStartDate,
          };
        } else {
          this.state.inputValue = {
            startDate: newStartDate,
            endDate,
          };
        }
      }

      if (dateType === 'endDate') {
        const newEndDate = endDate;
        newEndDate.setDate(day);

        if (newEndDate < startDate) {
          this.state.inputValue = {
            startDate: newEndDate,
            endDate: newEndDate,
          };
        } else {
          this.state.inputValue = {
            startDate,
            endDate: newEndDate,
          };
        }
      }
    },

    daysOnRange(day) {
      const startDate = this.getCurrentDate('startDate');
      const endDate = this.getCurrentDate('endDate');

      const yesterday = startDate
        ? new Date(startDate.getTime() - 86400000)
        : new Date();

      if (day >= yesterday && day <= endDate) return 'on-range';
      if (day < startDate || day > endDate) return 'disabled';
    },

    selectPeriod(period) {
      this.state.inputValue = this.state.periods[period];

      this.state.selectedFilterPeriod = period;

      this.state.inputValue = {
        startDate: new Date(this.state.inputValue.startDate),
        endDate: new Date(),
      };
    },

    changeMonth(dateType, direction) {
      const date = dateType === 'startDate'
        ? this.getCurrentDate('startDate')
        : this.getCurrentDate('endDate');

      const newDate = direction === 'next'
        ? new Date(date.setMonth(date.getMonth() + 1))
        : new Date(date.setMonth(date.getMonth() - 1));

      if (
        dateType === 'startDate'
        && newDate < this.getCurrentDate('endDate')
      )
        this.state.inputValue.startDate = newDate;
      else if (
        dateType === 'endDate'
        && newDate < this.getCurrentDate('startDate')
        && direction === 'prev'
      )
        this.state.inputValue.startDate = newDate;
      else this.state.inputValue.endDate = newDate;
    },

    resetDates() {
      this.selectPeriod('Hoje');
    },

    saveDates() {
      this.$emit('input', this.state.inputValue);
      this.state.isPickerVisible = false;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;

  .calendar-icon {
    position: absolute;
    color: var(--color-gray-90);
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    transition: all 0.3s ease;
    background: none;
    caret-color: transparent;
    cursor: pointer;
  }

  &:hover {
    input {
      background: var(--color-hover) !important;
      border: 1px solid var(--color-gray-90) !important;
    }
  }
}
.dropdown {
  position: relative;

  .calendars-on-left {
    right: 0;
    left: auto;
  }

  .calendars-on-right {
    border-radius: 0px 8px 8px 8px !important;
  }

  .calendars-main-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    background: var(--color-white);
    border: 1px solid var(--color-gray);
    width: 780px;
    height: 380px;
    box-shadow: 0px 1px 10px rgba(34, 34, 34, 0.1);
    border-radius: 8px 0px 8px 8px;
    margin-top: 16px;
    z-index: 999;

    .filters-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 150px;
      height: calc(100% - 8px);
      padding-top: 8px;

      p {
        padding: 12px 16px;
        width: 100%;
        cursor: pointer;

        &:hover {
          background: var(--color-hover);
        }
      }

      &:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 380px;
        top: 0;
        left: 150px;
        background: var(--color-gray-5);
      }
    }

    .calendars-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 630px;
      height: calc(100% - 8px);
      padding-top: 8px;

      .calendars {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 300px;
        padding-bottom: 8px;

        .calendar {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 24px;

          .calendar-header {
            width: 100%;
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 8px;
            align-self: stretch;

            .month-selector {
              width: 160px;
              display: flex;
              align-items: center;
              justify-content: space-around;
            }

            .selector {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .input {
                display: flex;
                align-items: center;
                width: 80px;
                justify-content: center;
                padding: 10px 0px;
                gap: 12px;
                border-radius: 20px;
                border: 1px solid transparent;

                &:hover {
                  background: var(--color-hover);
                }
              }

              .input-opened {
                border: 1px solid var(--color-gray-90) !important;
                border-radius: 20px 20px 0px 0px !important;
              }

              .start-input {
                right: 348px !important;
              }

              .start-month-input {
                right: 478px !important;
              }

              .end-input {
                right: 32px !important;
              }

              .end-month-input {
                right: 162px !important;
              }

              .selector-list {
                position: absolute;
                width: 80px;
                height: 270px;
                overflow-y: scroll;
                background: var(--color-white);
                padding: 0;
                top: 56px;
                right: 16px;
                border-radius: 8px 0px 8px 8px;
                box-shadow: 0px 2px 8px rgba(82, 89, 91, 0.14);
                z-index: 999;

                &::-webkit-scrollbar {
                  width: 4px;
                }

                &::-webkit-scrollbar-track {
                  background: var(--color-gray-5);
                }

                &::-webkit-scrollbar-thumb {
                  background: var(--color-primary);
                  border-radius: 4px;
                }

                li {
                  padding: 16px;
                  list-style: none;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;

                  &:hover {
                    background: var(--color-hover);
                  }
                }
              }
            }

            .calendar-header-title {
              display: flex;
            }

            .calendar-header-button {
              display: flex;
              flex-direction: row;
              gap: 8px;

              .icon-left {
                transform: rotate(270deg);

                &:hover {
                  background-color: rgba(var(--color-primary-rgb), 0.12);
                  border-radius: 50px;
                  transform: scale(1.03) rotate(270deg);
                }
              }

              .icon-right {
                transform: rotate(90deg);

                &:hover {
                  background-color: rgba(var(--color-primary-rgb), 0.12);
                  border-radius: 50px;
                  transform: scale(1.03) rotate(90deg);
                }
              }
            }
          }

          .calendar-days {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            flex-flow: row wrap;

            .weekdays {
              width: 40px;
              padding-bottom: 10px;
              display: flex !important;
              justify-content: center;
              align-self: center;
            }

            .day {
              display: flex !important;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 35px;
              color: var(--color-gray-40);

              &:hover {
                background: var(--color-hover);
              }
            }

            .on-range {
              background: rgba(var(--color-primary-rgb), 0.12);
              color: var(--color-gray-90);
            }
          }
        }
      }

      .buttons-container {
        width: calc(100% - 40px);
        height: 48px;
        display: flex;
        flex-direction: row;
        padding: 0px 16px 0px 24px;
        gap: 10px;

        .period-visualizer {
          width: calc(100% - 198px);
          height: 100%;
          display: flex;
          align-items: center;
        }

        .buttons {
          width: 198px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
