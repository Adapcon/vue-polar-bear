<template>
  <section>
    <div class="input-container">
      <input
        v-model="inputValue"
        class="pb"
        :style="inputStyle"
        :placeholder="inputValue"
        type="text"
        @click="showPicker"
      >
      <PbIcon
        class="calendar-icon"
        icon="fas fa-calendar-alt"
        @click.native="showPicker"
      />
    </div>
    <div
      v-if="state.isPickerVisible"
      class="calendaries-main-container"
    >
      <div class="filters-container">
        <p
          v-for="period in state.periods"
          :key="period"
          class="pb-md"
          @click="changePeriod(period)"
        >
          {{ period }}
        </p>
      </div>
      <div class="calendaries-container">
        <div class="calendaries">
          <div class="calendar">
            <div class="calendar-header">
              <div class="month-selector">
                <div class="calendar-header-button">
                  <PbIcon
                    class="icon"
                    :class="['fa-rotate-270']"
                    icon="fas fa-chevron-up"
                    @click.native="changeMonth('startDate', 'prev')"
                  />
                </div>
                <div class="selector">
                  <div
                    :class="state.isMonthSelectorOpen.startDate ? 'input input-opened' : 'input'"
                    @click="openMonthsSelector('startDate')"
                  >
                    <p class="pb-md">{{ monthTitle("startDate") }}</p>
                  </div>
                  <ul
                    v-if="state.isMonthSelectorOpen.startDate"
                    class="selector-list start-month-input"
                  >
                    <li
                      v-for="month in state.monthOptions"
                      :key="month"
                    >
                      <p
                        class="pb"
                        @click="selectMonth('startDate', month)"
                      >
                        {{ month }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="calendar-header-button">
                  <PbIcon
                    class="icon"
                    :class="['fa-rotate-90']"
                    icon="fas fa-chevron-up"
                    @click.native="changeMonth('startDate', 'next')"
                  />
                </div>
              </div>
              <div class="selector">
                <div
                  :class="state.isYearSelectorOpen.startDate ? 'input input-opened' : 'input'"
                  @click="openYearsSelector('startDate')"
                >
                  <p class="pb-md">{{ yearTitle("startDate") }}</p>
                  <PbIcon
                    style="color: var(--color-primary)"
                    icon="fas fa-chevron-up"
                    :class="['fa-rotate-180']"
                  />
                </div>
                <ul
                  v-if="state.isYearSelectorOpen.startDate"
                  class="selector-list start-input"
                >
                  <li
                    v-for="year in state.yearOptions"
                    :key="year"
                  >
                    <p
                      class="pb"
                      @click="selectYear('startDate', year)"
                    >
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
                  <PbIcon
                    class="icon"
                    :class="['fa-rotate-270']"
                    icon="fas fa-chevron-up"
                    @click.native="changeMonth('endDate', 'prev')"
                  />
                </div>
                <div class="selector">
                  <div
                    :class="state.isMonthSelectorOpen.endDate ? 'input input-opened' : 'input'"
                    @click="openMonthsSelector('endDate')"
                  >
                    <p class="pb-md">{{ monthTitle("endDate") }}</p>
                  </div>
                  <ul
                    v-if="state.isMonthSelectorOpen.endDate"
                    class="selector-list end-month-input"
                  >
                    <li
                      v-for="month in state.monthOptions"
                      :key="month"
                    >
                      <p
                        class="pb"
                        @click="selectMonth('endDate', month)"
                      >
                        {{ month }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="calendar-header-button">
                  <PbIcon
                    class="icon"
                    :class="['fa-rotate-90']"
                    icon="fas fa-chevron-up"
                    @click.native="changeMonth('endDate', 'next')"
                  />
                </div>
              </div>
              <div class="selector">
                <div
                  :class="state.isYearSelectorOpen.endDate ? 'input input-opened' : 'input'"
                  @click="openYearsSelector('endDate')"
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
                  class="selector-list input-end"
                >
                  <li
                    v-for="year in state.yearOptions"
                    :key="year"
                  >
                    <p
                      class="pb"
                      @click="selectYear('endDate', year)"
                    >
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
            <p class="pb-md">{{ showSelectedPeriod() }}</p>
          </div>
          <div class="buttons">
            <PbButton
              style="width: 100px; margin-right: 8px"
              color="gray-20"
              label="Redefinir"
              button-style="background"
              @click.native="resetDates()"
            />
            <PbButton
              style="width: 86px"
              color="primary"
              label="Aplicar"
              button-style="background"
              @click.native="applyFilter()"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { validateColor } from '@pb/utils/validator';
import { PbButton, PbIcon } from '@pb';

export default {
  name: 'PbDateRangePicker',

  components: {
    PbButton,
    PbIcon,
  },

  props: {
    value: { type: Object, default: () => {} },
    placeholder: { type: String, default: '' },
    color: {
      type: String,
      default: 'gray-20',
      validator: color => validateColor(color),
    },
  },

  data() {
    return {
      state: {
        inputValue: {},
        calendaryDates: {
          startDate: new Date(),
          endDate: new Date(),
        },
        monthOptions: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        isMonthSelectorOpen: {
          startDate: false,
          endDate: false,
        },
        yearOptions: [],
        isYearSelectorOpen: {
          startDate: false,
          endDate: false,
        },
        weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        isPickerVisible: false,
        periods: [
          'Hoje',
          'Últimos 30 dias',
          'Últimos 6 meses',
          'Últimos 12 meses',
        ],
      },
    };
  },

  computed: {
    inputStyle() {
      return {
        color: `var(--color-${this.color})`,
        border: `1px solid var(--color-${this.color})`,
        borderRadius: this.state.isPickerVisible ? '20px 20px 0 0' : '20px',
      };
    },
    inputValue: {
      get() {
        return this.state.inputValue.startDate === ''
          ? 'Selecione um período'
          : `${this.formatDate(
            this.state.inputValue.startDate,
          )} - ${this.formatDate(this.state.inputValue.endDate)}`;
      },
      set(value) {
        this.state.inputValue = value;
      },
    },
  },

  mounted() {
    this.state.inputValue = this.value;
  },

  methods: {
    showPicker() {
      this.state.isPickerVisible = !this.state.isPickerVisible;
    },
    showSelectedPeriod() {
      return this.state.inputValue.startDate ? this.inputValue : 'Início - Fim';
    },

    monthTitle(dateType) {
      const month = this.state.calendaryDates[dateType].toLocaleString(
        'default',
        {
          month: 'long',
        },
      );

      const capitalizedMonth = month.slice(0, 1).toUpperCase() + month.slice(1);
      return capitalizedMonth;
    },

    openMonthsSelector(dateType) {
      this.state.isMonthSelectorOpen[dateType] = !this.state.isMonthSelectorOpen[dateType];
    },

    yearTitle(dateType) {
      return this.state.calendaryDates[dateType].getFullYear();
    },

    selectMonth(dateType, month) {
      const date = new Date(this.state.calendaryDates[dateType]);
      const monthIndex = this.state.monthOptions.indexOf(month);
      date.setMonth(monthIndex);

      if ((dateType === 'startDate' && date > this.state.calendaryDates.endDate) || (dateType === 'endDate' && date < this.state.calendaryDates.startDate)) {
        this.state.calendaryDates.endDate = date;
        this.state.calendaryDates.startDate = date;
      } else { this.state.calendaryDates[dateType] = date; }

      this.state.isMonthSelectorOpen[dateType] = false;
    },

    openYearsSelector(dateType) {
      this.state.isYearSelectorOpen[dateType] = !this.state.isYearSelectorOpen[dateType];
      const year = this.state.calendaryDates.endDate.getFullYear();
      const yearOptions = [...Array(10).keys()].map(i => i + year - 5);
      this.state.yearOptions = yearOptions;
    },

    selectYear(dateType, year) {
      const date = new Date(this.state.calendaryDates[dateType]);
      date.setFullYear(year);

      if ((dateType === 'startDate' && date > this.state.calendaryDates.endDate) || (dateType === 'endDate' && date < this.state.calendaryDates.startDate)) {
        this.state.calendaryDates.endDate = date;
        this.state.calendaryDates.startDate = date;
      } else { this.state.calendaryDates[dateType] = date; }

      this.state.isYearSelectorOpen[dateType] = false;
    },

    days(dateType, monthOffset = 0) {
      const date = new Date(this.state.calendaryDates[dateType]);
      date.setMonth(date.getMonth() + monthOffset);

      const month = date.getMonth();
      const year = date.getFullYear();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [...Array(daysInMonth).keys()].map(i => i + 1);

      const dates = days.map((day, index) => {
        const id = index + 1;
        const dateObj = new Date(year, month, day);
        return { id, date: dateObj };
      });

      const emptyDays = [...Array(firstDay).fill({ id: null, date: null })];
      return [...emptyDays, ...dates];
    },

    selectDay(dateType, day) {
      const { startDate, endDate } = this.state.inputValue;

      if (day === null) return;

      if (dateType === 'startDate') {
        const newStartDate = new Date(this.state.calendaryDates.startDate);
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
        const newEndDate = new Date(this.state.calendaryDates.endDate);
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
      const { startDate } = this.state.inputValue;
      const { endDate } = this.state.inputValue;

      const yesterday = startDate
        ? new Date(startDate.getTime() - 86400000)
        : new Date();

      if (day >= yesterday && day <= endDate) return 'on-range';
      if (day < startDate || day > endDate) return 'disabled';
    },

    changePeriod(period) {
      const periodsInTimestamp = {
        Hoje: {
          startDate: new Date(),
          endDate: new Date(),
        },
        'Últimos 30 dias': {
          startDate: new Date(new Date().getTime() - 2592000000),
          endDate: new Date(),
        },
        'Últimos 6 meses': {
          startDate: new Date(new Date().getTime() - 15552000000),
          endDate: new Date(),
        },
        'Últimos 12 meses': {
          startDate: new Date(new Date().getTime() - 31104000000),
          endDate: new Date(),
        },
      };

      this.state.inputValue = periodsInTimestamp[period];

      this.state.calendaryDates = {
        startDate: new Date(this.state.inputValue.startDate),
        endDate: new Date(),
      };
    },

    changeMonth(dateType, direction) {
      const date = dateType === 'startDate'
        ? this.state.calendaryDates.startDate
        : this.state.calendaryDates.endDate;

      const newDate = direction === 'next'
        ? new Date(date.setMonth(date.getMonth() + 1))
        : new Date(date.setMonth(date.getMonth() - 1));

      if (
        dateType === 'startDate'
        && newDate < this.state.calendaryDates.endDate
      )
        this.state.calendaryDates.startDate = newDate;
      else if (
        dateType === 'endDate'
        && newDate < this.state.calendaryDates.startDate
        && direction === 'prev'
      )
        this.state.calendaryDates.startDate = newDate;
      else this.state.calendaryDates.endDate = newDate;
    },

    resetDates() {
      this.changePeriod('Hoje');
    },

    applyFilter() {
      this.$emit('input', this.state.inputValue);
      this.state.isPickerVisible = false;
    },

    formatDate(date) {
      const dateObj = new Date(date);
      return `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
      }/${dateObj.getFullYear()}`;
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
    right: -6px;
    transform: translateY(-50%);
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    transition: all 0.3s ease;
    background: none;
    color: var(--color-gray-90) !important;
    caret-color: transparent;
  }
}
.calendaries-main-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  border: 1px solid var(--color-gray);
  width: 780px;
  height: 380px;
  box-shadow: 0px 1px 10px rgba(34, 34, 34, 0.1);
  border-radius: 8px 0px 8px 8px;
  margin-top: 16px;

  .filters-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 150px;
    height: calc(100% - 8px);
    padding-top: 8px;

    p {
      padding: 12px 16px;
      width: calc(100% - 32px);
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

  .calendaries-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 630px;
    height: calc(100% - 8px);
    padding-top: 8px;

    .calendaries {
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
          justify-content: space-between;
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
            justify-content: space-around;

            .input {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 16px;
              gap: 12px;
              border-radius: 20px;

              &:hover {
                background: var(--color-hover);
              }
            }

            .input-opened {
              border: 1px solid var(--color-gray-90) !important;
              border-radius: 20px 20px 0px 0px !important;
            }

            .start-input {
             right: 332px !important;
            }

            .start-month-input {
              right: 488px !important;
            }

            .end-input {
              right: 16px !important;
            }

            .end-month-input {
              right: 186px !important;
            }

            .selector-list {
              position: absolute;
              width: 92px;
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

            .icon {
              padding: 13px 10px;
              color: var(--color-primary);
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
</style>
